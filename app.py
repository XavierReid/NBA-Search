from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from team import Team
from player import Player
import utils

app = Flask(__name__,  static_url_path='',
            static_folder="client/build",
            template_folder="client/build")

CORS(app)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/players")
def get_all_players():
    active_only = request.args.get("active_only")
    if active_only:
        active_only = active_only == "True"
    return jsonify(utils.all_players(active_only))


@app.route("/api/players/<player_id>")
def get_player(player_id):
    # 203507 --> Giannis
    player = Player(player_id)
    player_info = player.get_info_as_json()
    return jsonify(player_info)


@app.route("/api/players/<player_id>/stats/<season_type>")
def get_player_stats(player_id, season_type):
    player = Player(player_id)
    seasons, career = player.get_stats(season_type)
    seasons = [utils.parse_player_season_info(
        season, True) for season in seasons]
    if len(career) > 0:
        career = utils.parse_player_season_info(career[0], False)
    return jsonify({"seasons": seasons, "career": career})


@app.route("/api/players/<player_id>/stats/<season_type>/<season>")
def get_player_game_logs(player_id, season_type, season):
    date_from = request.args.get("date_from")
    date_to = request.args.get("date_to")
    player = Player(player_id)
    games = player.get_game_logs(season_type, season, date_from, date_to)
    games = [utils.parse_player_game_info(game) for game in games]
    return jsonify(games)


@app.route("/api/teams")
def get_all_teams():
    return jsonify(utils.all_teams())


@app.route("/api/teams/<team_id>")
def get_team(team_id):
    # 1610612744 --> GSW
    season = request.args.get("season")
    team = Team(team_id, season)
    team_info = team.get_info_as_json()
    res = {"basic_info": team_info, "adv_stats": team.adv_stats,
           "roster": team.roster, "coaches": team.coaches, "record": team.record}
    return jsonify(res)


@app.route("/api/teams/<team_id>/stats/<season_type>")
def get_team_stats(team_id, season_type):
    team = Team(team_id)
    seasons = team.get_stats(season_type)
    seasons = [utils.parse_team_season_info(season) for season in seasons]
    return jsonify(seasons)


@app.route("/api/teams/<team_id>/stats/<season_type>/<season>")
def get_team_game_logs(team_id, season_type, season):
    date_from = request.args.get("date_from")
    date_to = request.args.get("date_to")
    team = Team(team_id)
    games = team.get_game_logs(season_type, season, date_from, date_to)
    games = [utils.parse_team_game_info(game) for game in games]
    return jsonify(games)


@app.errorhandler(500)
def server_error(e):
    return "An internal error occured", 500


if __name__ == "__main__":
    app.run()
