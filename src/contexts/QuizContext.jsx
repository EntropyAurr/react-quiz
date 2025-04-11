import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  questIndex: 0,
  answer: null,
  currentPoints: 0,
  highscore: 0,
  secondsRemaining: null,
};

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

function QuizProvider({ children }) {
  const [{ questions, status, questIndex, answer, currentPoints, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0); // cur: current element in the questions array (each question object inside questions array)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  function Start() {
    dispatch({ type: "start" });
  }
  function Answer(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        questIndex,
        answer,
        currentPoints,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        Start,
        Answer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("QuizContext was used outside the QuizProvider.");
  }
}

export { QuizProvider, useQuiz };
