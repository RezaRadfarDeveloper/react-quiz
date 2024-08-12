import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return { ...state, questions: action.payload, status: "received" };
    }
    case "dataFailed": {
      return { ...state, status: "failed" };
    }
    default: {
      return "Unknown function";
    }
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}
