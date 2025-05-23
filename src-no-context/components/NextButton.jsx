function NextButton({ dispatch, answer, questIndex, numQuestions }) {
  if (answer === null) return null;

  if (questIndex < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );

  if (questIndex === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
}

export default NextButton;
