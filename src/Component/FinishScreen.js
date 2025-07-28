export default function finishScreen({ maxPoints, points, dispatch }) {
  const percentag = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored {points} out of {maxPoints} ({Math.ceil(percentag)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
