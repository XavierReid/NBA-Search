import nba_api.stats.endpoints as endpoints
from nba_api.stats.static import teams, players
import utils

HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.8',
    'Connection': 'keep-alive',
    'Host': 'stats.nba.com',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
}


class Player:
    def __init__(self, id):
        self.id = id

    def get_common_info(self):
        player_info = endpoints.CommonPlayerInfo(
            self.id, headers=HEADERS)
        common_info = player_info.common_player_info.get_dict()["data"][0]
        available_seasons = player_info.available_seasons.get_dict()["data"]
        headline_stats = player_info.player_headline_stats.get_dict()["data"]
        return utils.parse_player_info(common_info), utils.parse_seasons(available_seasons), headline_stats

    def get_game_log(self, season, season_type):
        game_log = endpoints.PlayerGameLog(
            self.id, season, season_type, headers=HEADERS)
        games = game_log.player_game_log.get_dict()["data"]
        games = [utils.parse_player_games(game) for game in games]
        return games

    def get_stats(self):
        profile = endpoints.PlayerProfileV2(
            self.id, per_mode36="PerGame", headers=HEADERS)
        reg_season = profile.season_totals_regular_season.get_dict()["data"]
        reg_season = [utils.parse_player_stats(
            season, True) for season in reg_season]
        reg_career = utils.parse_player_stats(
            profile.career_totals_regular_season.get_dict()["data"][0], False)

        post_season = profile.season_totals_post_season.get_dict()['data']
        post_career = profile.career_totals_post_season.get_dict()['data']
        if len(post_season) > 0:
            post_season = [utils.parse_player_stats(
                season, True) for season in post_season]
            post_career = utils.parse_player_stats(
                post_career[0], False)

        return {"regularSeason": (reg_season, [reg_career]), "postSeason": (post_season, [post_career])}


class Team:
    def __init__(self, id):
        self.id = id

    def get_common_info(self):
        team_info = endpoints.TeamInfoCommon(
            self.id, headers=HEADERS)
        common_info = team_info.team_info_common.get_dict()["data"][0]
        available_seasons = team_info.available_seasons.get_dict()['data']
        team_ranks = team_info.team_season_ranks.get_dict()['data'][0]
        return utils.parse_team_info(common_info), utils.parse_seasons(available_seasons), utils.parse_adv_info(team_ranks)

    def get_roster_and_staff(self, season=None):
        if season:
            team_roster = endpoints.CommonTeamRoster(
                self.id, season, headers=HEADERS)
        else:
            team_roster = endpoints.CommonTeamRoster(
                self.id, headers=HEADERS)

        roster = team_roster.common_team_roster.get_dict()["data"]
        coaches = team_roster.coaches.get_dict()["data"]
        return roster, coaches

    def get_game_log(self, season, season_type):
        game_log = endpoints.TeamGameLog(
            self.id, season, season_type, headers=HEADERS)
        games = game_log.team_game_log.get_dict()["data"]
        games = [utils.parse_team_games(game) for game in games]
        return games

    def get_stats(self):
        tybys = endpoints.TeamYearByYearStats(
            self.id,per_mode_simple="PerGame", headers=HEADERS)
        stats = tybys.get_dict()["resultSets"][0]["rowSet"]
        stats = [utils.parse_team_stats(season) for season in stats]
        return {"regularSeason": [stats]}


def get_players(active_only=False):
    if active_only:
        return players.get_active_players()
    return players.get_players()


def get_teams():
    return teams.get_teams()
