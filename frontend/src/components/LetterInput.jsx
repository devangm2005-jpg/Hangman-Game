const letters = "abcdefghijklmnopqrstuvwxyz".split("");

export default function LetterInput({ guessed, onGuess, disabled }) {
  return (
    <div className="keyboard">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessed.includes(letter) || disabled}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
