from nba_api.stats.endpoints import commonplayerinfo, playerprofilev2, playergamelog
from team import Team
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


class Player:
    def __init__(self, id):
        self.id = id
        self.common_info = commonplayerinfo.CommonPlayerInfo(
            id, headers=custom_headers, timeout=100)
        self.profile = playerprofilev2.PlayerProfileV2(
            id, "PerGame", headers=custom_headers, timeout=100)
        self.__get_basic_info()

    def __get_basic_info(self):
        dataset = self.common_info.common_player_info.get_dict()
        info = dataset["data"][0]
        self.first_name = info[1]
        self.last_name = info[2]
        self.birth_date = info[6]
        self.school = info[7]
        self.country = info[8]
        self.last_affiliation = info[9]
        self.height = info[10]
        self.weight = info[11]
        self.exp = info[12]
        self.jersey_num = info[13]
        self.position = info[14]
        self.team = Team(info[16])
        self.seasons = self.common_info.available_seasons.get_dict()

    def get_info_as_json(self):
        return {
            "player_id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "country": self.country,
            "school": self.school,
            "last_affiliation": self.last_affiliation,
            "height": self.height,
            "weight": self.weight,
            "exp": self.exp,
            "seasons": utils.parse_seasons(self.seasons["data"]),
            "team": {"name": self.team.name,
                     "city": self.team.city,
                     "abbr": self.team.abbr,
                     "team_id": self.team.id,
                     "pos": self.position,
                     "jersey_num": self.jersey_num}}

    def get_game_logs(self, season_type, season, date_from=None, date_to=None):
        game_logs = playergamelog.PlayerGameLog(
            self.id, season, season_type, headers=custom_headers, timeout=100)
        games = game_logs.player_game_log.get_dict()["data"]
        # return list(filter(lambda game: utils.verify_dates(game, True, date_from, date_to), games))
        return games

    def get_stats(self, season_type):
        if season_type == "Regular Season":
            season = self.profile.season_totals_regular_season.get_dict()
            career = self.profile.career_totals_regular_season.get_dict()
        elif season_type == "Playoffs":
            season = self.profile.season_totals_post_season.get_dict()
            career = self.profile.career_totals_post_season.get_dict()
        else:
            return None
        return season["data"], career["data"]
