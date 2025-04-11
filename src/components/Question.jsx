import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, questIndex, answer } = useQuiz();

  return (
    <div>
      <h4>{questions[questIndex].question}</h4>

      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
