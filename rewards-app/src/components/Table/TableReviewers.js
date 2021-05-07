import React, { Component } from 'react'
import { Header, Table, Image, Icon, Label, Button, Search, Container, Segment } from 'semantic-ui-react'
//import Identicon from "identicon.js";
import avatar from './matthew.png'
import avatar2 from './daniel.jpg'
import {Link} from 'react-router-dom'


export default class HeaderSearch extends Component {

    render() {
        return (
            <div>
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
                        <Table.Row>
                            <Table.Cell textAlign="left">
                                <Header as='h3' textAlign='left'>
                                    <Image
                                        avatar
                                        spaced='right'
                                        src={avatar}
                                    />
                                    <Header.Content>José Luis Bernarda</Header.Content>
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
                                <Button fluid animated='vertical'>
                                    <Button.Content hidden>Contact Reviewer</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='mail' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign="left">
                                <Header as='h3' textAlign='left'>
                                    <Image
                                        avatar
                                        spaced='right'
                                        src={avatar2}
                                    />
                                    <Header.Content as={Link} to='/profile'>Luis Vazquez Eminencia</Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell textAlign='center' >
                                <Header as='h3' textAlign='centered'>
                                    89
                                <Icon name="thumbs up outline" color="blue"></Icon>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Header as='h5' textAlign='center'>
                                    <Label color='yellow'>
                                        0
                                </Label>
                                    <Label color='grey'>
                                        10
                                </Label>
                                    <Label color='brown'>
                                        8
                                </Label>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Button fluid animated='vertical'>
                                    <Button.Content hidden>Contact Reviewer</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='mail' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table >
            </div>
        )
    }
}
