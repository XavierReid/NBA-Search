from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import nba

# SETUP
app = Flask(__name__,  static_url_path='',
            static_folder="client/build",
            template_folder="client/build")
CORS(app)

# ROUTES
@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/players")
def get_players():
    return jsonify(nba.get_players())


@app.route("/api/players/<player_id>")
def get_player(player_id):
    p = nba.Player(player_id)
    common_info, available_seasons, headline_stats = p.get_common_info()
    return jsonify({"commonInfo": common_info,
                    "availableSeasons": available_seasons,
                    "headlineStats": headline_stats[0]})


@app.route("/api/players/<player_id>/stats")
def get_player_stats(player_id):
    p = nba.Player(player_id)
    stats = p.get_stats()
    regular_season = stats["regularSeason"]
    post_season = stats["postSeason"]
    return jsonify({"regularSeason": regular_season, "postSeason": post_season})


@app.route("/api/players/<player_id>/stats/<season>/<season_type>")
def get_player_game_log(player_id, season, season_type):
    p = nba.Player(player_id)
    games = p.get_game_log(season, season_type)
    return jsonify(games)


@app.route("/api/teams")
def get_teams():
    return jsonify(nba.get_teams())


@app.route("/api/teams/<team_id>")
def get_team(team_id):
    t = nba.Team(team_id)
    common_info, available_seasons, team_ranks = t.get_common_info()
    roster, coaches = t.get_roster_and_staff()
    return jsonify({"commonInfo": common_info,
                    "availableSeasons": available_seasons,
                    "teamRanks": team_ranks,
                    "roster": roster,
                    "coaches": coaches})


@app.route("/api/teams/<team_id>/stats")
def get_team_stats(team_id):
    t = nba.Team(team_id)
    stats = t.get_stats()
    return jsonify(stats)


@app.route("/api/teams/<team_id>/stats/<season>/<season_type>")
def get_team_game_log(team_id, season, season_type):
    t = nba.Team(team_id)
    games = t.get_game_log(season, season_type)
    return jsonify(games)


if __name__ == "__main__":
    app.run(debug=True)
