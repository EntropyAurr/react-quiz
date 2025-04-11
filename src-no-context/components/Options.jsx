// function Options({ question, dispatch, answer }) {
//   const hasAnswered = answer !== null;

//   return (
//     <div className="options">
//       {question.options.map((option, index) => (
//         <button className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`} key={option} onClick={() => dispatch({ type: "newAnswer", payload: index })} disabled={answer !== null}>
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default Options;

function Options({ question, option, index, dispatch, answer }) {
  const hasAnswered = answer !== null;
  const isCorrect = index === question.correctOption;
  const classAnswer = isCorrect ? "correct" : "wrong";

  return (
    <button className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? classAnswer : ""}`} onClick={() => dispatch({ type: "newAnswer", payload: index })} disabled={answer !== null}>
      {option}
    </button>
  );
}

export default Options;
