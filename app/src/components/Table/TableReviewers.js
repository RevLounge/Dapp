import React, { Component } from 'react'
import { Header, Table, Image, Icon, Label, Button, Input, Container } from 'semantic-ui-react'
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
            bronzes: this.props.bronzes,
            search: null
        }
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword })
    }


    componentDidMount = async () => {
        await api.getAllReviewers().then(reviewers => {
            if (reviewers.length !== 0) {
                this.setState({
                    reviewers: reviewers.data.data,
                })
            }

        })
    }

    render() {
        const { reviewers, thanks, golds, silvers, bronzes } = this.state

        const reviewersList = reviewers.filter((reviewer) => {
            if (this.state.search == null)
                return reviewer
            else if (reviewer.name.toLowerCase().includes(this.state.search.toLowerCase()) || reviewer.surname.toLowerCase().includes(this.state.search.toLowerCase())) {
                return reviewer
            }
        }).map((reviewer, key) => {
            var color = stc(reviewer.account)
            return (
                <Table.Body>
                    <Table.Row key={reviewer._id}>
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
                                {thanks[reviewer._id]}
                                        &nbsp;
                                        <Icon name="thumbs up outline" color="blue"></Icon>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            <Header as='h5' textAlign='center'>
                                <Label color='yellow'>
                                    {golds[reviewer._id].length}
                                </Label>
                                <Label color='grey'>
                                    {silvers[reviewer._id].length}
                                </Label>
                                <Label color='brown'>
                                    {bronzes[reviewer._id].length}
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
                </Table.Body>
            )
        })

        return (
            <div>
                &nbsp;
                <Container fluid textAlign="center">
                    <Input focus size="big" icon='search' placeholder='Search reviewer´s name...' onChange={(e) => this.searchSpace(e)} centered />
                </Container>
                &nbsp;
                <Table celled basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Reviewer</Table.HeaderCell>
                            <Table.HeaderCell>Reputation</Table.HeaderCell>
                            <Table.HeaderCell>Awards</Table.HeaderCell>
                            <Table.HeaderCell>Contact</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {reviewersList}
                </Table>
            </div>
        )
    }
}

