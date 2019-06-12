import utils
from nba_api.stats.static import teams
from nba_api.stats.static import players
import datetime


def convert_date(date):
    months = {
        "JAN": "01",
        "FEB": "02",
        "MAR": "03",
        "APR": "04",
        "MAY": "05",
        "JUN": "06",
        "JUL": "07",
        "AUG": "08",
        "SEP": "09",
        "OCT": "10",
        "NOV": "11",
        "DEC": "12"
    }
    date_parts = date.split(" ")
    year, month, day = date_parts[2], months[date_parts[0]], date_parts[1][:2]
    return datetime.datetime(int(year), int(month), int(day))


def verify_dates(game, for_player, from_date=None, to_date=None):
    date = game[3] if for_player else game[2]
    date = convert_date(date)
    if from_date and to_date:
        start_date = datetime.datetime(
            int(from_date[:4]), int(from_date[4:6]), int(from_date[6:]))
        end_date = datetime.datetime(
            int(to_date[:4]), int(to_date[4:6]), int(to_date[6:]))
        return date >= start_date and date <= end_date
    elif from_date:
        start_date = datetime.datetime(
            int(from_date[:4]), int(from_date[4:6]), int(from_date[6:]))
        return date >= start_date
    elif to_date:
        end_date = datetime.datetime(
            int(to_date[:4]), int(to_date[4:6]), int(to_date[6:]))
        return date <= end_date
    return True


def parse_team_season_info(season):
    stats = {
        "year": season[3], "gp": season[4], "w": season[5], "l": season[6], "w_pct": season[7],
        "c_rank": season[8], "d_rank": season[9], "fgm": season[15], "fga": season[16], "fg_pct": season[17],
        "fg3m": season[18], "fg3a": season[19], "fg3_pct": season[20], "fta": season[21], "ftm": season[22],
        "ft_pct": season[23], "oreb": season[24], "reb": season[26], "ast": season[27], "pf": season[28],
        "stl": season[29], "tov": season[30], "blk": season[31], "pts": season[32], "pts_rank": season[33]
    }
    return stats


def parse_player_season_info(season, by_season):
    stats = {
        "gp": season[6] if by_season else season[3],
        "gs": season[7] if by_season else season[4],
        "mpg": season[8] if by_season else season[5],
        # "fgm": season[9] if by_season else season[6],
        # "fga": season[10] if by_season else season[7],
        "fg_pct": season[11] if by_season else season[8],
        # "fg3m": season[12] if by_season else season[9],
        # "fg3a": season[13] if by_season else season[10],
        "fg3_pct": season[14] if by_season else season[11],
        # "ftm": season[15] if by_season else season[12],
        # "fta": season[16] if by_season else season[13],
        "ft_pct": season[17] if by_season else season[14],
        "reb": season[20] if by_season else season[17],
        "ast": season[21] if by_season else season[18],
        "stl": season[22] if by_season else season[19],
        "blk": season[23] if by_season else season[20],
        "tov": season[24] if by_season else season[21],
        "pf": season[25] if by_season else season[22],
        "pts": season[26] if by_season else season[23]
    }
    if by_season:
        stats["season"] = season[1]
        stats["team"] = season[4]
        stats["age"] = season[5]

    return stats


def parse_player_game_info(game):
    return {
        "date": game[3],
        "matchup": game[4],
        "wl": game[5],
        "mins": game[6],
        "fgm": game[7],
        "fga": game[8],
        "fg3m": game[10],
        "fg3a": game[11],
        "ftm": game[13],
        "fta": game[14],
        "reb": game[18],
        "ast": game[19],
        "stl": game[20],
        "blk": game[21],
        "tov": game[22],
        "pf": game[23],
        "pts": game[24],
        "plus_minus": game[25]
    }


def parse_team_game_info(game):
    return {
        "date": game[2],
        "matchup": game[3],
        "wl": game[4],
        "w": game[5],
        "l": game[6],
        "fgm": game[9],
        "fga": game[10],
        "fg_pct": game[11],
        "fg3m": game[12],
        "fg3a": game[13],
        "fg3_pct": game[14],
        "ftm": game[15],
        "fta": game[16],
        "ft_pct": game[17],
        "oreb": game[18],
        "reb": game[20],
        "ast": game[21],
        "stl": game[22],
        "blk": game[23],
        "tov": game[24],
        "pf": game[25],
        "pts": game[26]
    }


def parse_seasons(season_ids):
    seasons = [id[0][1:] for id in season_ids]
    unique = list(set(seasons))
    for i, season in enumerate(unique):
        last2 = int(season[2:])
        if last2 + 1 > 99:
            next2 = "00"
        elif last2 + 1 < 10:
            next2 = "0{}".format(last2 + 1)
        else:
            next2 = str(last2 + 1)
        unique[i] = "{}-{}".format(season, next2)
    unique.sort(reverse=True)
    return unique


def all_players(active_only):
    if active_only:
        return players.get_active_players()
    return players.get_players()


def all_teams():
    return teams.get_teams()


def search_players(player_name):
    return players.find_players_by_full_name(player_name)


def search_teams(team_name):
    return teams.find_teams_by_full_name(team_name)
