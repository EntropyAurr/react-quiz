import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { answer, questIndex, numQuestions, NextQuestion, Finish } = useQuiz();

  if (answer === null) return null;

  if (questIndex < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={NextQuestion}>
        Next
      </button>
    );

  if (questIndex === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={Finish}>
        Finish
      </button>
    );
}

export default NextButton;
