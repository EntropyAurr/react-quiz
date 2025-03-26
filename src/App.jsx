import { useEffect, useReducer } from "react";
import Headers from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  questIndex: 0,
  answer: null,
  currentPoints: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return {
        status: "error",
      };

    case "start":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION };

    case "newAnswer":
      const currQuestion = state.questions.at(state.questIndex); /* to define the current question */

      return { ...state, answer: action.payload, currentPoints: action.payload === currQuestion.correctOption ? state.currentPoints + currQuestion.points : state.currentPoints };

    case "nextQuestion":
      return { ...state, questIndex: state.questIndex + 1, answer: null };

    case "finish":
      return { ...state, status: "finished", highscore: state.currentPoints > state.highscore ? state.currentPoints : state.highscore };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? "finished" : state.status };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, questIndex, answer, currentPoints, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0); // cur: current element in the questions array (each question object inside questions array)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <div className="app">
      <Headers />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}

        {status === "active" && (
          <>
            <Progress questIndex={questIndex} numQuestions={numQuestions} currentPoints={currentPoints} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[questIndex]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} questIndex={questIndex} numQuestions={numQuestions} />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen currentPoints={currentPoints} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}
