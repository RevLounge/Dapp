import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Dimmer,
  Icon,
  Popup,
  Progress,
  Container,
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../assets/logo-revlounge.png";
const { promisify } = require("util");

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      orcid: "",
      account: this.props.account,
      company: "",
      location: "",
      email: "",
      reviewId: "",
      errors: [],
      nextPulsado: false,
      percent: 0,
      namelength: 0,
      open: false,
    }; //Si al final se añade la contraseña a la bd, añadir aqui un estado de password.
  }

  increment = () => {
    this.setState((prevState) => ({
      percent: prevState.percent >= 100 ? 100 : prevState.percent + 0.4,
    }));
  };

  incrementNext = () => {
    this.setState((prevState) => ({
      percent: 90,
    }));
  };

  decrement = () => {
    this.setState((prevState) => ({
      percent: prevState.percent >= 100 ? 100 : prevState.percent - 0.5,
    }));
  };

  handleOpen = () => this.setState({ active: true });
  handleClose = () => {
    this.setState({ active: false });
    window.location.href = "../";
  };

  handleChangeInputName = async (event) => {
    const name = event.target.value;

    this.setState((prevState) => ({
      name:
        name.length < prevState.name.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ name });
  };
  handleChangeInputSurname = async (event) => {
    const surname = event.target.value;
    this.setState((prevState) => ({
      surname:
        surname.length < prevState.surname.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ surname });
  };
  handleChangeInputOrcid = async (event) => {
    const orcid = event.target.value;
    this.setState((prevState) => ({
      orcid:
        orcid.length < prevState.orcid.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ orcid });
  };
  handleChangeInputAccount = async (event) => {
    const rating = event.target.validity.valid
      ? event.target.value
      : this.state.rating;
  };

  handleChangeInputCompany = async (event) => {
    const company = event.target.value;
    this.setState((prevState) => ({
      company:
        company.length < prevState.company.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ company });
  };

  handleChangeInputLocation = async (event) => {
    const location = event.target.value;
    this.setState((prevState) => ({
      location:
        location.length < prevState.location.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ location });
  };

  handleChangeInputEmail = async (event) => {
    const email = event.target.value;
    this.setState((prevState) => ({
      email:
        email.length < prevState.email.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ email });
  };

  handleChangeInputReviewId = async (event) => {
    const reviewId = event.target.value;
    this.setState((prevState) => ({
      reviewId:
        reviewId.length < prevState.reviewId.length
          ? this.decrement()
          : this.increment(),
    }));
    this.setState({ reviewId });
  };

  validate() {
    const {
      name,
      surname,
      orcid,
      account,
      company,
      location,
      email,
      reviewId,
    } = this.state;
    let isValid = true;
    let errors = {};

    if (!name) {
      isValid = false;
      errors["name"] = "Please enter your name.";
    }

    if (!surname) {
      isValid = false;
      errors["surname"] = "Please enter your surname.";
    }

    if (typeof orcid !== "undefined") {
      if (orcid.length != 19) {
        isValid = false;
        errors["orcid"] = "Invalid ORCID.";
      }
    }

    if (!orcid) {
      isValid = false;
      errors["orcid"] = "Please enter your orcid.";
    }

    if (!company) {
      isValid = false;
      errors["company"] = "Please enter your company.";
    }

    if (!location) {
      isValid = false;
      errors["location"] = "Please enter your location.";
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter a valid email amigo.";
      }
    }

    this.setState({ errors: errors });
    console.log(this.state.errors);
    return isValid;
  }

  validateReviewId() {
    const { reviewId } = this.state;
    let isValid = true;
    let errors = {};
    if (!reviewId) {
      isValid = false;
      errors["reviewId"] = "Please enter a link to your review.";
    }
    this.setState({ errors: errors });
    console.log(this.state.errors);
    return isValid;
  }

  handleIncludeReviewer = async () => {
    const {
      name,
      surname,
      orcid,
      account,
      company,
      location,
      email,
      reviewId,
    } = this.state;
    const payload = {
      name,
      surname,
      orcid,
      account,
      company,
      location,
      email,
      reviewId,
    };
    const sleep = promisify(setTimeout);

    if (this.validateReviewId()) {
      await this.props.addReviewer(reviewId, payload).then((res) => {
        this.setState({
          name: "",
          surname: "",
          orcid: "",
          company: "",
          location: "",
          email: "",
          reviewId: "",
        });

        this.handleOpen();
      });
    }
  };

  handleNext = async () => {
    const {
      name,
      surname,
      orcid,
      account,
      company,
      location,
      email,
      nextPulsado,
    } = this.state;
    const payload = { name, surname, orcid, account, company, location, email };
    /*await this.props.setPayload(payload).then(res => {
            window.location.href = '/join/importFirstReview'
        });*/

    this.incrementNext();

    if (this.validate()) {
      this.setState({
        nextPulsado: true,
      });
    }
  };

  render() {
    const {
      name,
      surname,
      orcid,
      account,
      company,
      location,
      email,
      active,
      errors,
      reviewId,
      open,
    } = this.state;

    if (!this.state.nextPulsado) {
      return (
        <Grid textAlign="center" style={{ height: "100vh" }} columns={2}>
          <Grid.Column style={{ maxWidth: 450 }} verticalAlign="middle">
            <Image as={Link} to="/" src={logo} centered size="medium"></Image>

            {/*<Image as={Link} to='/' src={logo} centered size="medium"></Image>*/}

            <Header as="h1" textAlign="center">
              Step 1: Register in our platform
            </Header>
            <Form size="large">
              <Segment color="teal" textAlign="left">
                <h3>
                  We are really happy for your registration. Please, in order to
                  successfully register in our system provide us your
                  information.{" "}
                </h3>
              </Segment>
            </Form>
            <Header as="h1" textAlign="center" disabled="true">
              Step 2: Import your first review
            </Header>
            <Form size="large">
              <Segment color="teal" disabled="true" textAlign="left">
                <h3>
                  One last step. Now it's time to import your first review.
                </h3>
              </Segment>
            </Form>

            {/*<Segment color="teal" vertical>
              <div>
                <Progress percent={this.state.percent} indicating />
              </div>
          </Segment>*/}
          </Grid.Column>

          <Grid.Column
            style={{ maxWidth: 450 }}
            verticalAlign="middle"
            height="1000px"
          >
            <Header as="h1" textAlign="center">
              Register a new reviewer
            </Header>
            <Form size="large">
              <Segment color="teal">
                <Form.Input
                  fluid
                  icon="ethereum"
                  iconPosition="left"
                  name="ethereum-account"
                  value={account}
                  placeholder="Ethereum account"
                  required
                  readOnly
                />

                <Form.Input
                  fluid
                  icon="user"
                  name="name"
                  value={name}
                  iconPosition="left"
                  placeholder="Name"
                  onChange={this.handleChangeInputName}
                  error={errors["name"] !== undefined}
                  required
                />
                <Form.Input
                  fluid
                  icon="user"
                  name="surname"
                  value={surname}
                  iconPosition="left"
                  placeholder="Surname"
                  onChange={this.handleChangeInputSurname}
                  error={errors["surname"] !== undefined}
                  required
                />
                <Form.Input
                  fluid
                  icon="id card"
                  iconPosition="left"
                  name="orcid"
                  value={orcid}
                  placeholder="ORCID: XXXX-XXXX-XXXX-XXXX"
                  onChange={this.handleChangeInputOrcid}
                  error={errors["orcid"] !== undefined}
                  required
                />
                <Form.Input
                  fluid
                  icon="archive"
                  name="company"
                  value={company}
                  iconPosition="left"
                  placeholder="Company"
                  onChange={this.handleChangeInputCompany}
                  error={errors["company"] !== undefined}
                  required
                />
                <Form.Input
                  fluid
                  icon="map marker alternate"
                  value={location}
                  name="location"
                  iconPosition="left"
                  placeholder="Location"
                  onChange={this.handleChangeInputLocation}
                  error={errors["location"] !== undefined}
                  required
                />
                <Form.Input
                  fluid
                  icon="mail"
                  value={email}
                  name="email"
                  iconPosition="left"
                  placeholder="example@email.com"
                  onChange={this.handleChangeInputEmail}
                  error={errors["email"] !== undefined}
                  required
                />
                <Button onClick={this.handleNext} secondary fluid size="large">
                  Next
                </Button>
              </Segment>
            </Form>

            <Message>
              New to us?{" "}
              <a href="https://github.com/carlosrodrih/Rewards">Get info</a>
            </Message>
          </Grid.Column>
        </Grid>
      );
    } else {
      return (
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
          columns={2}
        >
          <Grid.Column style={{ maxWidth: 450 }} verticalAlign="bottom">
            <Image as={Link} to="/" src={logo} centered size="medium"></Image>
            <Header as="h1" textAlign="center" disabled="true">
              Step 1: Register in our platform
            </Header>
            <Form size="large">
              <Segment color="teal" disabled="true">
                <h3>
                  We are really happy for your registration. Please, in order to
                  successfully register in our system provide us your
                  information.{" "}
                </h3>
              </Segment>
            </Form>

            <Header as="h1" textAlign="center">
              Step 2: Import your first review!
            </Header>
            <Form size="large">
              <Segment color="teal" textAlign="left">
                <h3>
                  One last step. Now it's time to import your first review. If
                  you need help to import the review, please press the button
                  below
                </h3>
              </Segment>
            </Form>

            <Popup
              content={
                <>
                  <p>
                    <b>1º:</b> Go to your ORCID personal webpage.
                  </p>
                  <p>
                    <b>2º:</b> Find the Peer Review Tab.
                  </p>
                  <p>
                    <b>3º:</b> Display the information of the review you want to
                    import.
                  </p>
                  <p>
                    <b>4º:</b> Press the button "show details".
                  </p>
                  <p>
                    <b>5º:</b> Now press the link "OTHER-ID".
                  </p>
                  <p>
                    <b>6º:</b> Once the new tab is opened, copy the URL and
                    paste it in our app.
                  </p>
                  <Button href="http://localhost:3000/FAQ" target='_blank'>Press here for more help</Button>
                </>
              }
              on="click"
              popper={{ id: "popper-container", style: { zIndex: 5000 } }}
              trigger={
                <Segment>
                  <a>How to import a Review </a>
                </Segment>
              }
            />
            {/*<Segment color="teal">
              <div>
                <Progress percent={this.state.percent} indicating />
              </div>
            </Segment>*/}
          </Grid.Column>

          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Import your first review
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
                  fluid
                  icon="linkify"
                  value={reviewId}
                  name="reviewId"
                  iconPosition="left"
                  placeholder="URL of your review"
                  onChange={this.handleChangeInputReviewId}
                  required
                />
                <Button
                  onClick={this.handleIncludeReviewer}
                  secondary
                  fluid
                  size="large"
                >
                  Register
                </Button>
              </Segment>
            </Form>

            <Dimmer active={active} onClickOutside={this.handleClose} page>
              <Header as="h2" icon inverted>
                <Icon name="check" />
                You successfully registered!
              </Header>
              <Header.Subheader>
                Press anywhere to go back to Home Page
              </Header.Subheader>
            </Dimmer>
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default LoginForm;
