import Options from "./Options";
export default function Questions({ questions, answer, dispatch }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        options={questions.options}
        answer={answer}
        dispatch={dispatch}
        correctOption={questions.correctOption}
      />
    </div>
  );
}
