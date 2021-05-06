import React, { Component } from 'react'
import { Container, Segment, Image, Button, Grid, GridColumn } from 'semantic-ui-react'
import './Header.css'
import {Link} from 'react-router-dom'
import logo from './logo-revlounge-white.png'
//import Identicon from 'identicon.js';

export default class HeaderSearch extends Component {

  render() {
    return (
      <Segment inverted>
        <Container fluid>
          <Grid>
          <Grid columns='3' >
            <GridColumn></GridColumn>
            <GridColumn textAlign="center">
              <Image centered
              src={logo}
              size="medium"
              />
            </GridColumn>
            <GridColumn textAlign="right">
              <Button inverted as={Link} to='/join'>Register</Button>
            </GridColumn>
          </Grid>
          </Grid>
        </Container>
      </Segment>
    )
  }
}
