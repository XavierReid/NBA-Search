from nba_api.stats.endpoints import teamgamelog, teaminfocommon, commonteamroster, teamyearbyyearstats
import utils

custom_headers = {
    'Host': 'stats.nba.com',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
}
timeout = 5


class Team:
    def __init__(self, id, season=None):
        self.id = id
        self.common_info = teaminfocommon.TeamInfoCommon(
            team_id=id, season_nullable=season, headers=custom_headers, timeout=timeout)
        self.__get_basic_info()
        self.roster = self.get_roster()
        self.coaches = self.get_coaches()

    def __get_basic_info(self):
        info = self.common_info.team_info_common.get_dict()["data"][0]
        self.city = info[2]
        self.name = info[3]
        self.abbr = info[4]
        self.season = info[1]
        self.conference = info[5]
        self.division = info[6]
        self.seasons = self.common_info.available_seasons.get_dict()
        self.record = {
            "w": info[8],
            "l": info[9],
            "pct": info[10],
            "c_rank": info[11],
            "d_rank": info[12]
        }
        adv_data = self.common_info.team_season_ranks.get_dict()["data"][0]
        self.adv_stats = {
            "pts_rank": adv_data[3],
            "pts_pg": adv_data[4],
            "reb_rank": adv_data[5],
            "reb_pg": adv_data[6],
            "ast_rank": adv_data[7],
            "ast_pg": adv_data[8],
            "opp_pts_rank": adv_data[9],
            "opp_pts_pg": adv_data[10],
        }

    def get_info_as_json(self):
        return {
            "name": self.name,
            "city": self.city,
            "abbr": self.abbr,
            "team_id": self.id,
            "season": self.season,
            "conference": self.conference,
            "division": self.division,
            "seasons": utils.parse_seasons(self.seasons["data"])
        }

    def get_coaches(self, season=None):
        season = season or self.season
        datasets = commonteamroster.CommonTeamRoster(
            season=season, team_id=self.id, headers=custom_headers, timeout=timeout)
        coaches = datasets.coaches.get_dict()["data"]
        return list(
            map(
                lambda coach: {
                    "id": coach[2],
                    "first_name": coach[3],
                    "last_name": coach[4],
                    "full_name": coach[5],
                    "type": coach[8]
                }, coaches))

    def get_roster(self, season=None):
        season = season or self.season
        datasets = commonteamroster.CommonTeamRoster(
            season=season, team_id=self.id, headers=custom_headers, timeout=timeout)
        roster = datasets.common_team_roster.get_dict()["data"]
        return list(
            map(
                lambda player: {
                    "id": player[-1],
                    "full_name": player[3],
                    "num": player[4],
                    "pos": player[5],
                    "height": player[6],
                    "weight": player[7],
                    "birth_date": player[8],
                    "age": player[9],
                    "exp": player[-3],
                    "school": player[-2]
                }, roster))

    def get_game_logs(self, season_type, season, date_from=None, date_to=None):
        season = season or self.season
        logs = teamgamelog.TeamGameLog(self.id, season, season_type)
        games = logs.team_game_log.get_dict()["data"]
        # return list(filter(lambda game: utils.verify_dates(game, False, date_from, date_to), games))
        return games

    def get_stats(self, season_type):
        dataset = teamyearbyyearstats.TeamYearByYearStats(
            per_mode_simple="PerGame", season_type_all_star=season_type, team_id=self.id)
        stats = dataset.get_dict()["resultSets"][0]["rowSet"]
        return stats
