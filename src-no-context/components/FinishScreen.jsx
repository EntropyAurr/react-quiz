function FinishScreen({ currentPoints, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (currentPoints / maxPossiblePoints) * 100;
  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage > 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🥺";

  return (
    <>
      <p className="result">
        You scored: <strong>{currentPoints}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%) {emoji}
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
