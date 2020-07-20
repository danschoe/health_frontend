import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Diagnostic from './components/Diagnostic';
//import logo from './svg/logo.svg';
import './index.css';
import './app.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'cross-cutting',
      title: 'During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?',
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      allQuestions : [],
      answer: '',
      selectedAnswers : {},
      result: '',
      disorder : {}

    };
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.setPreviousQuestion = this.setPreviousQuestion.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.viewResults = this.viewResults.bind(this);
  }

  componentDidMount() {

    //https://github.com/axios/axios#request-config
    //https://jsonplaceholder.typicode.com/posts
    axios.get('http://127.0.0.1:8088/api/disorder/BPDS')
    .then(res => {
      let arr_qa = this.convert_data(res.data);
      //this.setState({ disorder : arr_qa });
      this.setState({
        question: arr_qa[0].question,
        answerOptions : arr_qa[0].answers,
        allQuestions : arr_qa,
        allQuestions_length : arr_qa.length
      });

    });

  }

  convert_data = (data_orig) => {
    let arr_qa=[];
    //let qa = new Object();
    let answers=[];
    //Object.entries(data_orig.content.sections.answers).map(([key, value]) => {});
    for (const answer of data_orig.content.sections[0].answers){
      answers.push({content: answer.title, type: answer.value, answer:false})
    }
    for (const q of data_orig.content.sections[0].questions){
      arr_qa.push({question:q.title, answerindex:1, question_id: q.question_id, answers: answers})
    }

    return arr_qa;
  }


  handleAnswerSelected(e){
    var _self = this;
    var obj = _self.state.selectedAnswers;
    var index = parseInt(e.target.value);
    console.log("for selected question number " + (_self.state.counter + 1) +  " answer is " + index + " selected");
    var Qindex = (_self.state.counter )
    // create map and store all selecred answers with quiz Questions
    obj[Qindex] = index;
    _self.setState({selectedAnswers : obj})

  }


  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.allQuestions[counter].question,
      answerOptions: this.state.allQuestions[counter].answers,
      answer: ''
    });
  }
  setPreviousQuestion() {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.allQuestions[counter].question,
      answerOptions: this.state.allQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz viewResults={this.viewResults}
        setNextQuestion={this.setNextQuestion}
        counter={this.state.counter}
        q_len={this.state.allQuestions.length}
        setPreviousQuestion={this.setPreviousQuestion}
        answer={this.state.answer}
        selectedAnswer = {this.state.selectedAnswers[this.state.counter]}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.allQuestions.length}
        onAnswerSelected = {this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.allQuestions} answers={this.state.selectedAnswers} />
    );
  }

  viewResults(e){
    e.preventDefault();
    this.setState({result : true})
  }

  //* Render result or questionnaire
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Mental Health Assessment : BPDS</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}


      </div>

    );
  }

  // render() {
  //   // let postData = this.state.disorder.map((disorder)=>{
  //   //   return(
  //   //     <div key={disorder.key}>
  //   //       <h3 key={disorder.key}>{disorder.title}</h3>
  //   //       <p key={disorder.key}>{disorder.body}</p>
  //   //     </div>
  //   //   );
  //   // });
  //   //
  //   });
  //
  //   return (
  //     <div>
  //       <Diagnostic name={this.state.name} />
  //       <p>
  //         {}
  //       </p>
  //     </div>
  //   );

}

//render(<App />, document.getElementById('data'));

export default App;
