def parse_player_stats(data, season_only):
    stats = {
        "GP": data[6] if season_only else data[3],
        "GS": data[7] if season_only else data[4],
        "MPG": data[8] if season_only else data[5],
        "FG_PCT": data[11] if season_only else data[8],
        "FG3_PCT": data[14] if season_only else data[11],
        "FT_PCT": data[17] if season_only else data[14],
        "REB": data[20] if season_only else data[17],
        "AST": data[21] if season_only else data[18],
        "STL": data[22] if season_only else data[19],
        "BLK": data[23] if season_only else data[20],
        "TOV": data[24] if season_only else data[21],
        "PF": data[25] if season_only else data[22],
        "PTS": data[26] if season_only else data[23]
    }
    if season_only:
        stats["SEASON"] = data[1]
        stats["TEAM"] = data[4]
        stats["AGE"] = data[5]
    return stats


def parse_team_stats(data):
    stats = {
        "YEAR": data[3], "GP": data[4], "W": data[5], "L": data[6], "W_PCT": data[7],
        "C_RANK": data[8], "D_RANK": data[9], "FGM": data[15], "FGA": data[16], "FG_PCT": data[17],
        "FG3M": data[18], "FG3A": data[19], "FG3_PCT": data[20], "FTA": data[21], "FTM": data[22],
        "FT_PCT": data[23], "OREB": data[24], "REB": data[26], "AST": data[27], "PF": data[28],
        "STL": data[29], "TOV": data[30], "BLK": data[31], "PTS": data[32], "PTS_RANK": data[33]
    }
    return stats


def parse_player_games(data):
    stats = {
        "GAME_ID": data[2],
        "DATE": data[3],
        "MATCHUP": data[4],
        "WL": data[5],
        "MINS": data[6],
        "FGM": data[7],
        "FGA": data[8],
        "FG3M": data[10],
        "FG3A": data[11],
        "FTM": data[13],
        "FTA": data[14],
        "REB": data[18],
        "AST": data[19],
        "STL": data[20],
        "BLK": data[21],
        "TOV": data[22],
        "PF": data[23],
        "PTS": data[24],
        "+/-": data[25]
    }
    return stats


def parse_team_games(data):
    stats = {
        "GAME_ID": data[1],
        "DATE": data[2],
        "MATCHUP": data[3],
        "WL": data[4],
        "W": data[5],
        "L": data[6],
        "FGM": data[9],
        "FGA": data[10],
        "FG_PCT": data[11],
        "FG3M": data[12],
        "FG3A": data[13],
        "FG3_PCT": data[14],
        "FTM": data[15],
        "FTA": data[16],
        "FT_PCT": data[17],
        "OREB": data[18],
        "REB": data[20],
        "AST": data[21],
        "STL": data[22],
        "BLK": data[23],
        "TOV": data[24],
        "PF": data[25],
        "PTS": data[26]
    }
    return stats


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


def parse_player_info(data):
    info = {
        "firstName": data[1],
        "lastName": data[2],
        'birthDate': data[6],
        "school": data[7],
        "country": data[8],
        "lastAffiliation": data[9],
        "height": data[10],
        "weight": data[11],
        "exp": data[12],
        "jerseyNum": data[13],
        "position": data[14],
        "teamId": data[16],
        "teamName": data[20] + " " + data[17]
    }
    return info

def parse_team_info(data):
    info = {
        "city": data[2],
        "name": data[3],
        "abbrv": data[4],
        "season": data[1],
        "conference": data[5],
        "division": data[6],
        "w": data[8],
        "l": data[9],
        "pct": data[10],
        "cRank": data[11],
        "dRank": data[12]
    }
    return info


def parse_adv_info(data):
    info = {
        "ptsRank": data[3],
        "ptsPg": data[4],
        "rebRank": data[5],
        "rebPg": data[6],
        "astRank": data[7],
        "astPg": data[8],
        "oppPtsRank": data[9],
        "oppPtsPg": data[10],
    }
    return info
