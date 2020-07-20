import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {

  function renderAnswerOptions(key,index) {
    return (
      <AnswerOption
        index ={index}
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        selectedAnswer={props.selectedAnswer}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }


  return (
      <div key={props.questionId} className="quiz-story">
        <QuestionCount counter={props.counter} viewResults={props.viewResults}
          counter={props.questionId}
          total={props.questionTotal}
        />
        <Question  content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        <div className="bottom-footer" >
          {props.counter > 0 ? (<button className="Previous-btn" onClick={props.setPreviousQuestion} >Previous</button>) : (<div></div>)}
          {props.counter < props.q_len-1 ? (<button className="next-btn" onClick={props.setNextQuestion} >Next</button>) : (<div></div>)}

        </div>
      </div>
  );
}


export default Quiz;
