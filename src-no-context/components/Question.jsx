// import Options from "./Options";

// function Question({ question, dispatch, answer }) {
//   return (
//     <div>
//       <h4>{question.question}</h4>

//       <Options question={question} dispatch={dispatch} answer={answer} />
//     </div>
//   );
// }

// export default Question;

import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>

      {question.options.map((option, index) => (
        <div className="options" key={option}>
          <Options question={question} option={option} index={index} dispatch={dispatch} answer={answer} />
        </div>
      ))}
    </div>
  );
}

export default Question;
