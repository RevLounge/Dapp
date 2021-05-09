import React, { Component } from 'react'
import { Header, Table, Image, Icon, Label, Button, Search, Container, Segment } from 'semantic-ui-react'
//import Identicon from "identicon.js";
import avatar from './matthew.png'
import avatar2 from './daniel.jpg'
import { Link } from 'react-router-dom'
import api from '../../api'



export default class HeaderSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reviewers: [],
        }
    }

    componentDidMount = async () => {
        await api.getAllReviewers().then(reviewers => {
            this.setState({
                reviewers: reviewers.data.data,
            })
        })
    }

    render() {
        const { reviewers } = this.state

        return (
                <Table celled basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Reviewer</Table.HeaderCell>
                            <Table.HeaderCell>Reputation</Table.HeaderCell>
                            <Table.HeaderCell>Rewards</Table.HeaderCell>
                            <Table.HeaderCell>Contact</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {reviewers.map((reviewer, key) => {
                            return(
                            <Table.Row key = {key}>
                                <Table.Cell textAlign="left">
                                    <Header as='h3' textAlign='left'>
                                        <Image
                                            avatar
                                            spaced='right'
                                            src={`https://eu.ui-avatars.com/api/?name=${reviewer.name}+${reviewer.surname}+&size=512&background=random`}
                                        />
                                        <Header.Content as={Link} to={`/reviewer/${reviewer._id}`}>{reviewer.name} {reviewer.surname}</Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell textAlign='center' >
                                    <Header as='h3'>
                                        321
                                <Icon name="thumbs up outline" color="blue"></Icon>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
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
                                </Table.Cell>
                                <Table.Cell>
                                    <Button fluid animated='vertical' href={`mailto:${reviewer.email}`}>
                                        <Button.Content hidden>Contact Reviewer</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='mail' />
                                        </Button.Content>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table >
        )
    }
}
