import { type } from "@testing-library/user-event/dist/type";
import { useEffect } from "react";

export default function Timer({ dispatch, secrndRenaimong }) {
  const mins = Math.floor(secrndRenaimong / 60);
  const secends = secrndRenaimong % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timerStart" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secends < 10 && "0"}
      {secends}
    </div>
  );
}
