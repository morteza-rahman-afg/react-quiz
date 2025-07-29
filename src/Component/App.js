import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestions from "./NextQuestions";
import FinishScreen from "./FinishScreen";
import { useEffect, useReducer } from "react";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loding",
  index: 0,
  answer: null,
  points: 0,
  secrndRenaimong: 20,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secrndRenaimong: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestions":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "timerStart":
      return {
        ...state,
        secrndRenaimong: state.secrndRenaimong - 1,
        status: state.secrndRenaimong === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unkonwn");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    fetch("https://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loding" && <Loader />}
        {state.status === "Error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              numQuestions={numQuestions}
              points={state.points}
              maxPoints={maxPoints}
              answer={state.answer}
            />
            <Questions
              questions={state.questions[state.index]}
              answer={state.answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secrndRenaimong={state.secrndRenaimong}
              />
              <NextQuestions
                dispatch={dispatch}
                answer={state.answer}
                numQuestions={numQuestions}
                index={state.index}
              />
            </Footer>
          </>
        )}
        {state.status === "finished" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={state.points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
