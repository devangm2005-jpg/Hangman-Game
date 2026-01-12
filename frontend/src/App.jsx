import React, { useState } from "react";
import "./App.css";

function App() {
  const [gameId, setGameId] = useState(null);
  const [display, setDisplay] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [lives, setLives] = useState(6);
  const [hangman, setHangman] = useState("");
  const [status, setStatus] = useState("playing");
  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");

  const startGame = async () => {
    const res = await fetch("https://hangman-game-s70j.onrender.com/start", { method: "POST" });
    const data = await res.json();
    setGameId(data.gameId);
    setDisplay(data.display);
    setGuessed(data.guessed);
    setLives(data.lives);
    setHangman(data.hangman);
    setStatus(data.status);
    setWord(data.word); // 👈 save correct word
    setLetter("");
  };

  const guessLetter = async () => {
    if (!letter || status !== "playing") return;
    const res = await fetch("https://hangman-game-s70j.onrender.com/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, letter }),
    });
    const data = await res.json();
    setDisplay(data.display);
    setGuessed(data.guessed);
    setLives(data.lives);
    setHangman(data.hangman);
    setStatus(data.status);
    setLetter("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") guessLetter();
  };

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      {!gameId ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <>
          <pre>{hangman}</pre>
          <p style={{ fontSize: "24px" }}>{display}</p>
          <p>Guessed letters: {guessed.join(", ")}</p>
          <p>Lives: {lives}</p>

          {status === "playing" ? (
            <>
              <input
                maxLength={1}
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter a letter"
              />
              <button onClick={guessLetter}>Guess</button>
            </>
          ) : (
            <>
              <h2>
                {status === "won"
                  ? "Congratulations! You won!"
                  : `Game Over! The word was: ${word}`}
              </h2>
              <button onClick={startGame}>Play Again</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
