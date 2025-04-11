import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, questIndex, answer, Answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions[questIndex].options.map((option, index) => (
        <button className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === questions[questIndex].correctOption ? "correct" : "wrong") : ""}`} key={option} onClick={() => Answer(index)} disabled={hasAnswered}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
