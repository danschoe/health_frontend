import React from 'react';
import axios from 'axios';


class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        diagnostic_result : [],
    };
  }

  componentDidMount() {
    let post_data = {answers:[]};
    let i=0;
    for (let [key, value] of Object.entries(this.props.answers)) {
      post_data.answers.push({question_id: this.props.quizResult[i].question_id, value: value })
      i++;
    }
    axios.post('http://127.0.0.1:8088/api/diagnostic',
       post_data
    ).then(res => {
        console.log(res.data.results[0]);
        console.log(res.data.results[1]);
        this.setState({
          diagnostic_result: res.data.results
        });

    });
  }


  render (){
    const listItems = this.state.diagnostic_result.map((diag, index) =>
      <li key={ index.toString() }>{diag}</li>
    );

    return (
    <div  className="quiz-story">
      <div>
        <strong>Diagnosis Results:</strong>
        <div>
          {listItems}
        </div>
        <ul>

        </ul>
        </div>
    </div>
    )
  }
}

export default Result;
