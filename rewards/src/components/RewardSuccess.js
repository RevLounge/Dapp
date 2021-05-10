
import React from 'react'
import { Button, Form, Grid, Icon, Image, Message, Segment, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import logo from '../assets/logo-revlounge.png'

const RewardsSuccess = ({ isSuccess, setSubmission }) => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={logo} />
            <Form size='large'>
                <Segment>
                    {!isSuccess ? (<Header as='h2' icon>
                        <Icon name='remove circle' color='red' />
                             Ups...
                        <Header.Subheader>
                            Something went wrong.
                        </Header.Subheader>
                    </Header>) : (
                        <Header as='h2' icon>
                            <Icon name='check circle' color='green' />
                             Done!
                            <Header.Subheader>
                                World is now a better place!
                        </Header.Subheader>
                        </Header>
                    )}
                    <Header.Subheader>
                        <Button onClick={() => {
                           window.close()
                        }}>Go back</Button>
                    </Header.Subheader>
                </Segment>
            </Form>
            <Message>
                New to us? <a href='https://github.com/carlosrodrih/Rewards'><Icon name='github' color='black'></Icon></a>
            </Message>
        </Grid.Column>
    </Grid>
)

export default RewardsSuccess