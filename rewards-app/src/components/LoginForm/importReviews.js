import React, { Component } from 'react'
import api from '../../api'
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
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

class ReviewersAddReview extends Component {
    

      constructor(props){
        super(props)    

        this.state = {
          id:'',
          reviewId: '',
      }
    }

    handleChangeInputReviewId = async event => {
        const reviewId = event.target.value
        this.setState({ reviewId })
    }



    handleUpdateReviewer = async () => {
        const { id, reviewId } = this.state
        const payload = { reviewId }

        await api.addRandomReviewtoReviewer(id, payload).then(res => {
            window.alert(`Reviewer updated successfully`)
            this.setState({
                reviewId: '',
            })
        })
    }

   /* componentDidMount = async () => {
        const { id } = this.state
        const reviewer = await api.getReviewerById(id)

        this.setState({
            name: reviewer.data.data.name,
            rating: reviewer.data.data.rating,
            time: reviewer.data.data.time.join('/'),
        })
    }*/

    render() {
      
        const { reviewId, active } = this.state
        return (

          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                    <Header as='h2' color="black" textAlign='center' >
                        Import a New Review
                    </Header>
                    <Form size='large'>

                  
                        <Segment>
                            <Form.Input fluid icon='edit' name='reviewId' value={reviewId} iconPosition='left' placeholder='ReviewId'  onChange={this.handleChangeInputReviewId}/>
                            
                            
                            <Button onClick={this.handleUpdateReviewer}secondary fluid size='large'>
                                Add
                            </Button>
                           
                        </Segment>
                    </Form>
                    
                    <Message>
                        New to us? <a href='https://github.com/carlosrodrih/Rewards'>Get info</a>
                    </Message>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='handshake outline' />
                            Successfully Added!
                        </Header>
                    </Dimmer>
                </Grid.Column>
            </Grid>
          
            /*<Wrapper>
                <Title>Add a review to a Reviewer</Title>

                <Label>reviewId: </Label>
                <InputText
                    type="text"
                    value={reviewId}
                    onChange={this.handleChangeInputReviewId}
                />


                <Button onClick={this.handleUpdateReviewer}>Add Review</Button>
                <CancelButton href={'/reviewers/list'}>Cancel</CancelButton>
            </Wrapper>*/
        )
    }
}

export default ReviewersAddReview