import React, { Component } from 'react'
import { Header, Table, Image, Icon, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import api from '../../api'
const stc = require('string-to-color');



export default class HeaderSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reviewers: [],
            thanks: this.props.thanks,
            golds: this.props.golds,
            silvers: this.props.silvers,
            bronzes: this.props.bronzes
        }
    }

    componentDidMount = async () => {
        await api.getAllReviewers().then(reviewers => {
            if(reviewers.length !== 0){
                this.setState({
                reviewers: reviewers.data.data,
            })
            }
            
        })
    }

    render() {
        const { reviewers, thanks, golds, silvers, bronzes } = this.state
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
                        var color = stc(reviewer.account)
                        return (
                            <Table.Row key={key}>
                                <Table.Cell textAlign="left">
                                    <Header as='h3' textAlign='left'>
                                        <Image
                                            avatar
                                            spaced='right'
                                            src={`https://eu.ui-avatars.com/api/?name=${reviewer.name}+${reviewer.surname}+&size=512&background=${color.substring(1)}&color=ffff`}
                                        />
                                        <Header.Content as={Link} to={`/reviewer/${reviewer._id}`}>{reviewer.name} {reviewer.surname}</Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell textAlign='center' >
                                    <Header as='h3'>
                                        {thanks[key]}
                                        &nbsp; 
                                        <Icon name="thumbs up outline" color="blue"></Icon>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    <Header as='h5' textAlign='center'>
                                        <Label color='yellow'>
                                        {golds[key].length}
                                </Label>
                                        <Label color='grey'>
                                            {silvers[key].length}
                                </Label>
                                        <Label color='brown'>
                                            {bronzes[key].length}
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
