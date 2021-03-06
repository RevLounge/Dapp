import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Web3 from 'web3';
import { Loader, Dimmer, Image, Header, Button, Modal } from 'semantic-ui-react'
import HeaderSearch from './components/Header/Header';
import TableReviewers from './components/Table/TableReviewers';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Profile from './components/Profile/Profile';
import ImportReviews from './components/RegisterForm/importReviews';
import RewardsContract from './contracts/Rewards.json';
import FAQ from './components/FAQ/faq';
import api from './api';
import logometamask from './assets/metamask.png';

class App extends Component {

  async componentDidMount() {
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
      this.setState({ metamask: false })
      //window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

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
      const paperCount = await instance.methods.getPaperCount().call();
      const reviewersCount = await instance.methods.getReviewersCount().call();
      if (paperCount < 1) {

        await instance.methods
          .createPaper("paper")
          .send({ from: this.state.account })
          .once("receipt", (receipt) => {
          });
      }
      //Load Reputation and Awards 
      for (var i = 0; i < reviewersCount; i++) {
        const reviewer = await instance.methods.reviewers(i).call();
        const thank = await instance.methods.getReputation(reviewer).call();
        const awardsCount = await instance.methods.getAwardsBalance(reviewer).call();
        var auxGold = [];
        var auxSilver = [];
        var auxBronze = [];
        for (var k = 0; k < awardsCount; k++) {
          const award = await instance.methods.getAward(reviewer, k).call();
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
        this.setState({ thanks: [...this.state.thanks, thank] });
        this.setState({ golds: [...this.state.golds, auxGold] });
        this.setState({ silvers: [...this.state.silvers, auxSilver] });
        this.setState({ bronzes: [...this.state.bronzes, auxBronze] });
      }
      this.setState({ ready: false });
      this.setState({ contract: instance });

      await api.getAllReviewers().then(reviewers => {
        if (reviewers.length !== 0) {
          this.setState({
            reviewers: reviewers.data.data,
          })
        }

      })

    } catch (error) {
      //alert("Something went wrong while loading blockchain data.");
      console.error(error);
    }
  };


  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contract: null,
      thanks: [],
      golds: [],
      silvers: [],
      bronzes: [],
      ready: true,
      reviewers: [],
      metamask: true,
    }
    this.addReviewer = this.addReviewer.bind(this);
    this.addReview = this.addReview.bind(this);
  }

  async addReviewer(review_id, payload) {
    this.setState({ ready: false });
    await this.state.contract.methods
      .addReviewer(0, this.state.account, review_id)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ ready: true });
        api.insertReviewer(payload);
      });
  }

  async addReview(reviewer_id, review_id, review_account, payload) {
    this.setState({ ready: false });
    await this.state.contract.methods
      .addReviewer(0, review_account, review_id)
      .send({ from: review_account })
      .once("receipt", (receipt) => {
        api.addRandomReviewtoReviewer(reviewer_id, payload);
        this.setState({ ready: true });
      });
  }


  render() {
    if (!this.state.contract) {
      if (!this.state.metamask) {
        return (
          <Dimmer page active>
            <Image src={logometamask} size='small' inline="centered"></Image>
            <Header inverted>Non-Ethereum browser detected. You should consider trying Metamask!</Header>
            <Modal
              trigger={<Button>How to install it?</Button>}
            >
              <Modal.Header>
                What is MetaMask?
            </Modal.Header>
              <Modal.Content>
                <a href='https://metamask.io'>MetaMask</a> is an extension for Chrome or Firefox that connects to an Ethereum network and allows to interact with dapps like this one.
              <Header as='h3'>Installing Metamask</Header>
                <ul>
                  <li>To install MetaMask for Chrome, go to the <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Chrome Web Store</a> and click the <b>Add to Chrome</b> button.</li>
                  <li>To install MetaMask for FireFox, go to the <a href='https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'>Firefox Add-ons page</a> and click the <b>Add to Firefox</b> button.</li>
                </ul>
                Then import your private keys from ganache using the MENEMONIC as import seed phrase. Now you will be ready to use our dapp.
              </Modal.Content>
            </Modal>
          </Dimmer>
        )
      } else {
        return (
          <Dimmer page active>
            <Loader active size='massive' inline="centered">Loading...</Loader>
          </Dimmer>
        )
      }
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() =>
            this.state.ready ? (
              <Dimmer page active>
                <Loader active size='massive' inline="centered">Loading...</Loader>
              </Dimmer>
            ) : (<div>
              <HeaderSearch myaccount={this.state.account}></HeaderSearch>
              <TableReviewers thanks={this.state.thanks} golds={this.state.golds} silvers={this.state.silvers} bronzes={this.state.bronzes} />
            </div>
            )}>
          </Route>
          <Route exact path="/join">
            <RegisterForm addReviewer={this.addReviewer} account={this.state.account}></RegisterForm>
          </Route>
          <Route exact
            path="/reviewer/:id"
            render={(props) => (
              <div>
                <HeaderSearch myaccount={this.state.account}></HeaderSearch>
                <Profile {...props.match.params} myaccount={this.state.account} thanks={this.state.thanks[props.match.params.id]} golds={this.state.golds[props.match.params.id]} silvers={this.state.silvers[props.match.params.id]} bronzes={this.state.bronzes[props.match.params.id]} />
              </div>
            )}
          >
          </Route>
          <Route path="/importReviews/:id"
            exact
            render={(props) => (
              <ImportReviews {...props.match.params} addReview={this.addReview} account={this.state.account}></ImportReviews>
            )}
          >
          </Route>
          <Route path="/FAQ"
            exact
            render={(props) => (
              <div>
                <HeaderSearch></HeaderSearch>
                <FAQ></FAQ>
              </div>

            )}
          >
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
