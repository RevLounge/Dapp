import React, { Component } from 'react'
import { Card, Grid, Icon, Label, Header, Segment, Image, GridColumn, Container } from 'semantic-ui-react'
import avatar from '../../assets/daniel.jpg'

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


export default class Profile extends Component {

    render() {
        return (
            <Container>
                <Grid textAlign='center'>
                    <Grid.Row centered>
                        <GridColumn>
                            <Card>
                                <Image src={avatar} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Description extra>
                                        <Header as='h3' textAlign='center'>
                                            321
                                        <Icon name="thumbs up outline" color="blue"></Icon>
                                        </Header>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {extra}
                                </Card.Content>
                            </Card>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}