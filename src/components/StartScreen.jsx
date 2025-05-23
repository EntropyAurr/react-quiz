import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, Start } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={Start}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
