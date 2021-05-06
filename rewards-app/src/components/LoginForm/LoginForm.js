import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from './logo-revlounge.png'

export default class LoginForm extends Component {
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center' >
                        <Image src={logo} size="massive"></Image>Register a new Reviewer
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Complete Name' />
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

                            <Button color='teal' fluid size='large'>
                                Register
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a href='#'>Get info</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }


}