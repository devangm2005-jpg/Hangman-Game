export default function WordDisplay({ display }) {
  return (
    <div className="word">
      {display.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </div>
  );
}
