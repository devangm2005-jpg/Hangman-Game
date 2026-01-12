import random
from .words import WORDS
from .art import HANGMAN

class HangmanGame:
    def __init__(self, word=None):
        # Pick a random word if none is provided
        self.word = word if word else random.choice(WORDS)
        self.display = ["_"] * len(self.word)
        self.guessed_letters = set()
        self.max_lives = 6
        self.lives = self.max_lives
        self.status = "playing"

    def guess(self, letter):
        if self.status != "playing":
            return

        if not letter.isalpha() or letter in self.guessed_letters:
            return

        self.guessed_letters.add(letter)

        if letter in self.word:
            for i, ch in enumerate(self.word):
                if ch == letter:
                    self.display[i] = letter
        else:
            self.lives -= 1

        if "_" not in self.display:
            self.status = "won"
        elif self.lives <= 0:
            self.status = "lost"

    def state(self):
        stage_index = self.max_lives - self.lives
        stage_index = min(stage_index, len(HANGMAN) - 1)
        stage_index = max(stage_index, 0)

        return {
            "display": " ".join(self.display),
            "guessed": list(self.guessed_letters),
            "lives": self.lives,
            "status": self.status,
            "hangman": HANGMAN[stage_index],
            "word": self.word  # 👈 send the word so frontend can show it
        }
