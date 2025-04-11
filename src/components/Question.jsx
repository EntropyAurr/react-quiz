import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, questIndex } = useQuiz();

  return (
    <div>
      <h4>{questions[questIndex].question}</h4>

      <Options />
    </div>
  );
}

export default Question;
