import React, { Component } from 'react';
import Rewards from '../src/components/Rewards.js';
import RewardsSuccess from './components/RewardSuccess.js';
import RewardsContract from "./contracts/Rewards.json";
import Web3 from 'web3';
import './App.css';


class App extends Component {

  async componentWillMount() {
    this.getUrlInfo();
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  //load data from the blockchain
  async loadBlockchainData() {
    const web3 = window.web3;
    try {
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RewardsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RewardsContract.abi,
        deployedNetwork.address
      );
      this.setState({ ready: false });
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      isSuccess: true,
      tipAmount: 0,
      from: null,
      to: null,
      account: null,
      review_id: null
    }

    this.sayThanks = this.sayThanks.bind(this);
    this.tipReviewer = this.tipReviewer.bind(this);
    this.giveAward = this.giveAward.bind(this);
    this.setSubmission = this.setSubmission.bind(this);
  };

  setSubmission(ok) {
    this.setState({ isSubmitted: ok })
  }

  setSuccess(ok) {
    this.setState({ isSuccess: ok })
  }

  tipReviewer(id, amount, account) {
    this.setState({ ready: true });
    this.state.contract.methods
      .tipReviewer(id, account)
      .send({ from: this.state.account, value: amount })
      .once("receipt", (receipt) => {
        this.setSuccess(true)
        this.setSubmission(true)
      });
  }

  sayThanks(id, account) {
    this.state.contract.methods
      .giveReputation(id, account)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setSuccess(true)
        this.setSubmission(true)
      })
  }

  giveAward(award_id, award_hash) {
    console.log(award_hash)
    this.state.contract.methods
    .giveAward(0, this.state.to, award_id, award_hash, this.state.review_id)
    .send({ from: this.state.account })
    .once("receipt", (receipt) => {
      this.setSuccess(true)
      this.setSubmission(true)
    })
  }

  getUrlInfo() {
    let url_string = window.location.href
    let url = new URL(url_string);
    let _from = this.state.account;
    let _to = url.searchParams.get("to");
    let _review = url.searchParams.get("rev");


    this.setState({ from: _from, to: _to, review_id: _review })
  }

  render() {
    return (
      <div>
        {!this.state.isSubmitted ? (
          <Rewards tipReviewer={this.tipReviewer} sayThanks={this.sayThanks} giveAward={this.giveAward} from={this.state.account} to={this.state.to} reviewid={this.state.review_id}/>
        ) : (
          <RewardsSuccess isSuccess={this.state.isSuccess} setSubmission={this.setSubmission} />
        )}
      </div>
    );
  }
}

export default App;
