export default function Options({ options, answer, dispatch, correctOption }) {
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option 
            ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer !== null}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
