import React, { Component } from 'react'
import { Container, Segment, Image, Button, Grid, GridColumn, Search } from 'semantic-ui-react'
import './Header.css'
import { Link } from 'react-router-dom'
import logoAntiguo from './logo-revlounge-white.png'
import logo from './logo.png'
//import Identicon from 'identicon.js';

export default class HeaderSearch extends Component {

  render() {
    return (
      <div>
        <Segment inverted>
          <Container fluid>
            <Grid>
              <Grid columns='3' >
                <GridColumn></GridColumn>
                <GridColumn textAlign="center">
                  <Image centered
                    as={Link} to='/'
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
          {/*<Container fluid textAlign="center">
            <Search placeholder="Search for a Reviewer" size="large"></Search>
          </Container>*/}
        </Segment>
      </div>
    )
  }
}
