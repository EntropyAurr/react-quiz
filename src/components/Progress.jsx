import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, questIndex, answer, currentPoints, maxPossiblePoints } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={questIndex + Number(answer !== null)} />
      <p>
        Question <strong>{questIndex + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{currentPoints}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
