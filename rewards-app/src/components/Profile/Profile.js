import React, { Component } from 'react'
import { Card, Grid, Statistic, Label, Header, List, Image, GridColumn, Container, Divider, Segment } from 'semantic-ui-react'
import avatar from '../../assets/daniel.jpg'
import './Profile.css'

const extra = (
    <a>
        <Header as='h5' textAlign='center'>
            <Label color='yellow'>
                1
            </Label>
            <Label color='grey'>
                9
            </Label>
            <Label color='brown'>
                18
            </Label>
        </Header>
    </a>
)

const card = (
    <Card>
        <Image src={avatar} wrapped ui={false} />
        <Card.Content>
            <Card.Description textAlign='center' extra>
                <Statistic size='small' horizontal>
                    <Statistic.Value>309</Statistic.Value>
                    <Statistic.Label>Reputation</Statistic.Label>
                </Statistic>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            {extra}
        </Card.Content>
    </Card>
)


export default class Profile extends Component {

    render() {
        return (
            <div>
                <p></p>
                <Grid centered>
                    <Grid.Row columns={5}>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column width={2} floated='right'>
                            {card}
                        </Grid.Column>
                        <Grid.Column width={3} floated='left'>
                            <Container fluid textAlign='justified'>
                                <Header as='h2'>Luis Vázquez Eminencia</Header>
                                <p>
                                    Domestic dogs inherited complex behaviors, such as bite inhibition, from
                                    their wolf ancestors, which would have been pack hunters with complex
                                    body language. These sophisticated forms of social cognition and
                                    communication may account for their trainability, playfulness, and
                                    ability to fit into human households and social situations, and these
                                    attributes have given dogs a relationship with humans that has enabled
                                    them to become one of the most successful species on the planet today.
                                </p>
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={2} floated='right'>
                            <Segment stacked fluid>
                                <List>
                                    <List.Item icon='users' content='Universidad Complutense de Madrid' />
                                    <List.Item icon='marker' content='Madrid, Spain' />
                                    <List.Item
                                        icon='mail'
                                        content={<a href='mailto:lvazquez@ucm.es'>lvazquez@minencia.es</a>}
                                    />
                                    <List.Item
                                        icon='linkify'
                                        content={<a href='http://www.semantic-ui.com'>luisvazquez.io</a>}
                                    />
                                </List>

                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4} />
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <GridColumn width={4} />
                        <GridColumn width={8}>
                            <Header as='h2' floated='left'>Reviews (3)</Header>
                            <Divider clearing />
                            <Segment>
                                <List divided relaxed>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Snickerdoodle</List.Header>
                                            An excellent companion
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Poodle</List.Header>
                                            A poodle, its pretty basic
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Header>Paulo</List.Header>
                                            He's also a dog
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>
                        </GridColumn>
                        <Grid.Column width={4} />
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <GridColumn width={4} />
                        <GridColumn width={8}>
                            <Header as='h2' floated='left'>Rewards (28)</Header>
                            <Divider clearing />
                            <Grid>
                                <Grid.Row columns='3' divided>
                                    <Grid.Column>
                                        <Segment raised inverted color='yellow' textAlign='center' size='big' fluid>Gold</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment raised inverted color='grey' textAlign='center' size='big' fluid>Silver</Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment raised inverted color='brown' textAlign='center' size='big' fluid>Bronce</Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </GridColumn>
                        <Grid.Column width={4} />
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}