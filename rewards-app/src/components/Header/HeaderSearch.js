import React, { Component } from "react";
import {
  Container,
  Segment,
  Image,
  Button,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import "./Header.css";
import { Link } from "react-router-dom";
import logoAntiguo from "./logo-revlounge-white.png";
import logo from "./logo.png";
//import Identicon from 'identicon.js';
import api from "../../api";

export default class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myaccount: this.props.myaccount,
      isRegistered: false,
    };
    this.isRegistered();
  }

  isRegistered() {
    api.getReviewerByAccount(this.state.myaccount).then((reviewer) => {
      if (reviewer.data.data._id >= 0) {
        console.log("yeeee")
        this.setState({
          reviewer: reviewer.data.data._id,
          isRegistered: true,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Segment inverted>
          <Container fluid>
            <Grid>
              <Grid columns="3">
                <GridColumn></GridColumn>
                <GridColumn textAlign="center">
                  <Image centered as={Link} to="/" src={logo} size="medium" />
                </GridColumn>
                <GridColumn textAlign="right">
                  <Button inverted as={Link} to="/FAQ">
                    FAQs
                    </Button>
                    &nbsp;
                  {this.state.isRegistered ? (
                    <Button
                      inverted
                      as={Link}
                      to={`/reviewer/${this.state.reviewer}`}
                    >
                      Profile
                    </Button>
                  ) : (
                    <Button inverted as={Link} to="/join">
                      Register
                    </Button>
                  )}

                </GridColumn>
              </Grid>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}
