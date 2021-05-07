import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo-revlounge.png'

export default class LoginForm extends Component {
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                    <Header as='h2' color="black" textAlign='center' >
                        Register a new Reviewer
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' />
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Surname' />
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input fluid icon='map marker alternate' iconPosition='left' placeholder='Country' />
                            <Form.Input fluid icon='ethereum' iconPosition='left' placeholder='Ethereum account' />
                            <Form.Input fluid icon='id card' iconPosition='left' placeholder='ORCID ID' />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button secondary fluid size='large'>
                                Register
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a href='https://github.com/carlosrodrih/Rewards'>Get info</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }


}