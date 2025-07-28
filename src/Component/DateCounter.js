import { useReducer } from "react";
const initialState = { count: 0, step: 1 };

function reducer(states, action) {
  switch (action.type) {
    case "dec":
      return { ...states, count: states.count - states.step };
    case "inc":
      return { ...states, count: states.count + states.step };
    case "setCount":
      return { ...states, count: action.pelyode };
    case "setStep":
      return { ...states, step: action.pelyode };
    case "reset":
      return { ...initialState, count: 0, step: 1 };
    default:
      throw new Error("rgtyrfew");
  }
}
function DateCounter() {
  const [states, dispatch] = useReducer(reducer, initialState);

  const { count, step } = states;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", pelyode: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", pelyode: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
