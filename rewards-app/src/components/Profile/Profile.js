import React, { Component } from 'react'
import { Card, Grid, Statistic, Label, Header, List, Image, GridColumn, Container, Divider, Segment, Button } from 'semantic-ui-react'
import api from '../../api'
import './Profile.css'
const stc = require('string-to-color');




export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            surname: '',
            summary: '',
            orcid: '',
            account: '',
            company: '',
            location: '',
            email: '',
            reviews: [],
            thanks: this.props.thanks,
            golds: this.props.golds,
            silvers: this.props.silvers,
            bronzes: this.props.bronzes,
        }
    }

    componentDidMount = async () => {
        await api.getReviewerById(this.props.id).then(reviewer => {
            this.setState({
                name: reviewer.data.data.name,
                surname: reviewer.data.data.surname,
                summary: reviewer.data.data.summary,
                orcid: reviewer.data.data.orcid,
                account: reviewer.data.data.account,
                company: reviewer.data.data.company,
                location: reviewer.data.data.location,
                email: reviewer.data.data.email,
                reviews: reviewer.data.data.reviews,
            })
        })
    }

    handleUpdateReviewer = async () => {
       
        
        window.location.href = `/importReviews/${this.props.id}`
        
        /*const { id, reviewId } = this.state
        const payload = { reviewId }
        window.alert('hola')

        {await api.addRandomReviewtoReviewer(id, payload).then(res => {
            window.alert(`Reviewer updated successfully`)
            this.setState({
                reviewId: '',
            })
        })}*/
    }



    render() {
        const { name, surname, summary, orcid, account, company, location, email, reviews, thanks, golds, silvers, bronzes } = this.state
        var color= stc(account)
        return (
            <div>
                <p></p>
                <Grid centered>
                    <Grid.Row columns={5}>
                        <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={2} floated='right'>
                            {/*EMPIEZA CARD*/}
                            <Card>
                                <Image src={`https://eu.ui-avatars.com/api/?name=${name}+${surname}+&size=512&background=${color.substring(1)}&color=ffff`} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Description textAlign='center' extra>
                                        <Statistic size='mini' horizontal>
                                            <Statistic.Value>{thanks}</Statistic.Value>
                                            <Statistic.Label>Reputation</Statistic.Label>
                                        </Statistic>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {/*EMPIEZA EXTRA*/}
                                    <a>
                                    <Header as='h5' textAlign='center'>
                                        <Label color='yellow'>
                                            {golds.length}
                                        </Label>
                                        <Label color='grey'>
                                            {silvers.length}
                                        </Label>
                                        <Label color='brown'>
                                            {bronzes.length}
                                        </Label>
                                    </Header>
                                    </a>
                                    {/*TERMINA EXTRA*/}
                                </Card.Content>
                            </Card>
                        {/*TERMINA CARD*/}

                        </Grid.Column>
                        <Grid.Column width={4} floated='left'>
                            <Container fluid textAlign='justified'>
                                <Header as='h2'>{name} {surname}</Header>
                                <Header as='h5'>Cuenta: {account}</Header>
                                 
                                <p>
                                    {summary}
                                </p>
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={3} floated='right'>
                            <Segment stacked fluid>
                                <List>
                                    <List.Item icon='users' content={company} />
                                    <List.Item icon='marker' content={location} />
                                    <List.Item
                                        icon='mail'
                                        content={<a href={`mailto:${email}`}>{email}</a>}
                                    />
                                    <List.Item
                                        icon='linkify'
                                        content={`Orcid: ${orcid}`}
                                    />
                                </List>

                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3} />
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <GridColumn width={3 } />
                        <GridColumn width={9}>
                            <Header as='h2' floated='left'>Reviews ({reviews.length})</Header>
                            <Button onClick={this.handleUpdateReviewer}>
                                Add a new review
                            </Button>
                            <Divider clearing />
                            <Segment>
                                <List divided relaxed>
                                    {reviews.map((review) => {
                                        return (
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header><a href={review.reviewId}>{review.title}</a></List.Header>
                                                    {review.description}
                                                </List.Content>
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </Segment>
                        </GridColumn>                      
                        <Grid.Column width={3} />
                    </Grid.Row>

                    <Grid.Row columns={3}>
                        <GridColumn width={3} />
                        <GridColumn width={9}>
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
                        <Grid.Column width={3} />
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}