import React, { Component } from 'react';
import Rewards from '../src/components/Rewards.js';
import RewardsSuccess from './components/RewardSuccess.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSubmitted: false,
      isSuccess: true,
      tipAmount: 0,
    }

    this.setSubmission = this.setSubmission.bind(this);
    this.setTipAmount = this.setTipAmount.bind(this);
  };

  setSubmission(ok){
    this.setState({isSubmitted: ok})
  }

  setTipAmount(amount){
    this.setState({tipAmount: amount})
  }

  render(){
    return(
      <div>
      {!this.state.isSubmitted ? (
        <Rewards setSubmission={this.setSubmission} setTipAmount={this.setTipAmount}/>
      ):(
        <RewardsSuccess isSuccess={this.state.isSuccess} setSubmission={this.setSubmission}/>
      )}
      </div>
    );
  }
}

export default App;
