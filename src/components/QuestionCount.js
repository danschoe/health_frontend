import React from 'react';

function QuestionCount(props) {

  return (
    <div className="questionCount">
      Question <span>{props.counter}</span> of <span>{props.total}</span>
      {props.counter === props.total ? (<a className="result-link" href="" onClick={props.viewResults}>View Results</a>) : (<div></div>)}
    </div>
  );

}

export default QuestionCount;
