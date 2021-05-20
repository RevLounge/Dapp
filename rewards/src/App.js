import React, { Component } from 'react';
import Rewards from '../src/components/Rewards.js';
import RewardsSuccess from './components/RewardSuccess.js';
import RewardsContract from "./contracts/Rewards.json";
import Web3 from 'web3';
import './App.css';
import api from './api'
import { Dimmer, Loader } from 'semantic-ui-react';


class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.getUrlInfo();
    await this.getReputation(this.state.to);
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

  async loadBlockchainData() {
    const web3 = window.web3;
    try {
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      //Search if tipper is registered
      if (this.state.account !== '') {
        let _tipper = await api.getReviewerByAccount(this.state.account);
        if (_tipper != null) {
          let name = _tipper.data.data.name;
          name = name.concat(" ");
          name = name.concat(_tipper.data.data.surname);
          console.log("Tipper name: ", name)
          this.setState({ tipper: name })
        }
      }
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
      to: '',
      account: '',
      review_id: '',
      tipper: '',
      reputation: 0,
      reviews: 0,
      golds: [],
      silver: [],
      bronzes: [],
      ready: false,
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

  async getReputation(account) {
    if (account !== '') {
      const thank = await this.state.contract.methods.getReputation(account).call();
      const awardsCount = await this.state.contract.methods.getAwardsBalance(account).call();
      var auxGold = [];
      var auxSilver = [];
      var auxBronze = [];
      for (var i = 0; i < awardsCount; i++) {
        const award = await this.state.contract.methods.getAward(account, i).call();
        switch (award.awardId) {
          case '0':
            auxGold.push(award)
            break;
          case '1':
            auxSilver.push(award)
            break;
          case '2':
            auxBronze.push(award)
            break;
        }
      }
      this.setState({ reputation: thank });
      this.setState({ golds: auxGold });
      this.setState({ silvers: auxSilver });
      this.setState({ bronzes: auxBronze });
      this.setState({ ready: true })
    }
  }

  async getUrlInfo() {
    let url_string = window.location.href
    let url = new URL(url_string);
    let _review = url.searchParams.get("rev");
    if (_review != null) {
      let account = await this.state.contract.methods.getReviewerByReview(_review).call();
      if (account != null) {
        let _reviewer = await api.getReviewerByAccount(account);
        this.setState({ to: account, review_id: _review, reviewer: _reviewer })
      }
    }

  }


  render() {
    if (this.state.ready) {
      return (
        <div>
          {!this.state.isSubmitted ? (
            <Rewards tipReviewer={this.tipReviewer} sayThanks={this.sayThanks} giveAward={this.giveAward} reputation={this.state.reputation} reviews={this.state.reviews}
              golds={this.state.golds} silvers={this.state.silvers} bronzes={this.state.bronzes}
              from={this.state.account} to={this.state.to} reviewer={this.state.reviewer} reviewid={this.state.review_id} tipper={this.state.tipper} />
          ) : (
            <RewardsSuccess isSuccess={this.state.isSuccess} setSubmission={this.setSubmission} />
          )}
        </div>
      );
    } else {
      return (
        <Dimmer page active>
            <Loader active size='massive' inline="centered">Loading...</Loader>
        </Dimmer>
      )
    }
  }
}

export default App;
