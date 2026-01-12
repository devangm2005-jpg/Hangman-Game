from flask import Flask, request, jsonify
from flask_cors import CORS
from game.logic import HangmanGame
import os

app = Flask(__name__)
CORS(app)

games = {}

@app.route("/", methods=["GET"])
def health():
    return {"message": "Hangman backend is running"}

@app.route("/start", methods=["POST"])
def start_game():
    game = HangmanGame()  # random word inside logic.py
    game_id = id(game)
    games[game_id] = game

    return jsonify({
        "gameId": game_id,
        **game.state()
    })

@app.route("/guess", methods=["POST"])
def guess_letter():
    data = request.get_json()
    game_id = data.get("gameId")
    letter = data.get("letter")

    if not game_id or not letter:
        return jsonify({"error": "Invalid request"}), 400

    game = games.get(game_id)
    if not game:
        return jsonify({"error": "Game not found"}), 404

    game.guess(letter.lower())
    return jsonify(game.state())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
