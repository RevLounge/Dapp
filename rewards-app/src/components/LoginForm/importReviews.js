import React, { Component } from 'react'
import api from '../../api'
import { Button, Form, Grid, Header, Image, Popup, Segment, Dimmer, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-revlounge.png'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`


const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

export default class importReviews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            reviewId: '',
            review_account: '',
            account: this.props.account,

        }
    }

    componentDidMount = async () => {
        await api.getReviewerById(this.props.id).then(reviewer => {
            this.setState({
                review_account: reviewer.data.data.account,
            })
        })
    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => {
        this.setState({ active: false })
    }



    handleChangeInputReviewId = async event => {
        const reviewId = event.target.value
        this.setState({ reviewId })
    }



    handleUpdateReviewer = async () => {


        const { id, reviewId, review_account } = this.state
        const payload = { reviewId }
        await this.props.addReview(id, reviewId, review_account, payload).then(res => {
            this.setState({
                reviewId: '',
            })
        })

        this.handleOpen()

    }

    render() {

        const { reviewId, active, review_account, account } = this.state
        if (account !== review_account) {
            return (
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                        <Header as='h2' color="black" textAlign='center' >
                            Import a New Review
                        </Header>
                        <Form size='large'>
                            <Segment>
                                You should not be here.
                            </Segment>
                        </Form>
                        <p></p>
                        <Button as={Link} to={`/reviewer/${this.state.id}`} size='large'>
                            Go Back
                        </Button>
                    </Grid.Column>
                </Grid>
            )
        }
        return (


            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                    <Header as='h2' color="black" textAlign='center' >
                        Import a New Review
                    </Header>
                    <Form size='large'>


                        <Segment>
                            <Form.Input fluid icon='edit' name='reviewId' value={reviewId} iconPosition='left' placeholder='Review link' onChange={this.handleChangeInputReviewId} />


                            <Button onClick={this.handleUpdateReviewer} secondary fluid size='large'>
                                Add
                            </Button>

                        </Segment>
                    </Form>
                    <p></p>
                    <Button.Group widths='2' basic>
                        <Popup
                            trigger={
                                <Button>
                                    How to import?
                                </Button>
                            }
                            content={
                                <div>
                                    <p>
                                        <b>1º:</b> Find the peer review that you want to import.
                                    </p>
                                    <p>
                                        <b>2º:</b> Get the URL.
                                    </p>
                                    <p>
                                        <b>3º:</b> Once you have copied the URL, paste it in our platform.
                                    </p>
                                    <Button href="http://localhost:3000/FAQ" target='_blank' centered>More help</Button>
                                </div>
                            }
                            on="click"
                            popper={{ id: "popper-container", style: { zIndex: 5000 } }}
                        />
                        <Button as={Link} to={`/reviewer/${this.state.id}`} size='large'>
                            Go back
                        </Button>
                    </Button.Group>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check' />
                            Successfully Added!
                        </Header>
                        <Header.Subheader>Press anywhere to close</Header.Subheader>
                    </Dimmer>
                </Grid.Column>
            </Grid>
        )
    }
}

