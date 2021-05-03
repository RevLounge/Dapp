import React, { Component } from 'react';
import Rewards from '../src/components/Rewards.js';
import RewardsSuccess from './components/RewardSuccess.js';
import './App.css';

class App extends Component {
  componentDidMount = async () => {
    this.getUrlInfo();
  }
  constructor(props){
    super(props);
    this.state = {
      isSubmitted: false,
      isSuccess: true,
      tipAmount: 0,
      from: null,
      to: null,
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

  getUrlInfo(){
    let url_string = window.location.href
    let url = new URL(url_string);
    let _from = url.searchParams.get("from");
    let _to = url.searchParams.get("to");

    this.setState({from: _from, to: _to})
  }

  render(){
    return(
      <div>
      {!this.state.isSubmitted ? (
        <Rewards setSubmission={this.setSubmission} setTipAmount={this.setTipAmount} from={this.state.from} to={this.state.to}/>
      ):(
        <RewardsSuccess isSuccess={this.state.isSuccess} setSubmission={this.setSubmission}/>
      )}
      </div>
    );
  }
}

export default App;
