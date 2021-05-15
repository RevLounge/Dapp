import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Icon, Label } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import logo from '../../assets/logo-revlounge.png'
import api from '../../api'
const { promisify } = require('util')


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            surname: '',
            orcid: '',
            account: this.props.account,
            company: '',
            location: '',
            email: '',
            reviewId: '',
            errors: [],
            nextPulsado: false,
        }//Si al final se añade la contraseña a la bd, añadir aqui un estado de password.
    }



    handleOpen = () => this.setState({ active: true })
    handleClose = () => {
        this.setState({ active: false })
        window.location.href = '../'
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }
    handleChangeInputSurname = async event => {
        const surname = event.target.value
        this.setState({ surname })
    }
    handleChangeInputOrcid = async event => {
        const orcid = event.target.value
        this.setState({ orcid })
    }
    handleChangeInputAccount = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

    }
    handleChangeInputCompany = async event => {
        const company = event.target.value
        this.setState({ company })
    }
    handleChangeInputLocation = async event => {
        const location = event.target.value
        this.setState({ location })
    }
    handleChangeInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }
    handleChangeInputReviewId = async event => {
        const reviewId = event.target.value
        this.setState({ reviewId })
    }
    

    validate() {
        const { name, surname, orcid, account, company, location, email, reviewId} = this.state
        let isValid = true;
        let errors = {};

        if (!name) {
            isValid = false;
            errors["name"] = "Please enter your name."
        }

        if (!surname) {
            isValid = false;
            errors["surname"] = "Please enter your surname."
        }

        if (typeof (orcid) !== "undefined") {
            if (orcid.length != 19) {
                isValid = false;
                errors["orcid"] = "Invalid ORCID."
            }
        }

        if (!orcid) {
            isValid = false;
            errors["orcid"] = "Please enter your orcid."
        }

        if (!company) {
            isValid = false;
            errors["company"] = "Please enter your company."
        }

        if (!location) {
            isValid = false;
            errors["location"] = "Please enter your location."
        }


        if (!email) {
            isValid = false;
            errors["email"] = "Please enter your email."
        }



        if (typeof (email) !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false
                errors["email"] = "Please enter a valid email amigo."
            }
        }

        

        
        this.setState({ errors: errors })
        console.log(this.state.errors)
        return isValid;

    }

    validateReviewId(){
        const {reviewId} = this.state
        let isValid = true;
        let errors = {};
        if (!reviewId) {
            isValid = false;
            errors["reviewId"] = "Please enter a link to your review."
        }
        this.setState({ errors: errors })
        console.log(this.state.errors)
        return isValid;
    }

    handleIncludeReviewer = async () => {
        const { name, surname, orcid, account, company, location, email, reviewId } = this.state
        const payload = { name, surname, orcid, account, company, location, email, reviewId }
        const sleep = promisify(setTimeout)
          
       
        if (this.validateReviewId()) {
            await this.props.addReviewer(reviewId, payload).then(res => {

                this.setState({
                    name: '',
                    surname: '',
                    orcid: '',
                    company: '',
                    location: '',
                    email: '',
                    reviewId: ''

                })

                this.handleOpen()
            });
        }
    


    }


    handleNext = async () => {
        const { name, surname, orcid, account, company, location, email, nextPulsado} = this.state
        const payload = { name, surname, orcid, account, company, location, email}
        /*await this.props.setPayload(payload).then(res => {
            window.location.href = '/join/importFirstReview'
        });*/
        
        if (this.validate()) {
            this.setState({
                nextPulsado: true            
            })
        }
        
      
        
        }
       
    
    
    render() {
        const { name, surname, orcid, account, company, location, email, active, errors, reviewId } = this.state

        
        if(!this.state.nextPulsado){
        return (

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                    <Header as='h2' color="black" textAlign='center' >
                        Register a new Reviewer
                    </Header>
                    <Form size='large'>


                        <Segment>
                            <Form.Input fluid icon='ethereum' iconPosition='left' name='ethereum-account' value={account} placeholder='Ethereum account' required readOnly />
                            <Form.Input fluid icon='user' name='name' value={name} iconPosition='left' placeholder='Name' onChange={this.handleChangeInputName} error={errors["name"] !== undefined} required />
                            <Form.Input fluid icon='user' name='surname' value={surname} iconPosition='left' placeholder='Surname' onChange={this.handleChangeInputSurname} error={errors["surname"] !== undefined} required />
                            <Form.Input fluid icon='id card' iconPosition='left' name='orcid' value={orcid} placeholder='ORCID: XXXX-XXXX-XXXX-XXXX' onChange={this.handleChangeInputOrcid} error={errors["orcid"] !== undefined} required />
                            <Form.Input fluid icon='archive' name='company' value={company} iconPosition='left' placeholder='Company' onChange={this.handleChangeInputCompany} error={errors["company"] !== undefined} required />
                            <Form.Input fluid icon='map marker alternate' value={location} name='location' iconPosition='left' placeholder='Location' onChange={this.handleChangeInputLocation} error={errors["location"] !== undefined} required />
                            <Form.Input fluid icon='mail' value={email} name='email' iconPosition='left' placeholder='example@email.com' onChange={this.handleChangeInputEmail} error={errors["email"] !== undefined} required />
                            <Button onClick={this.handleNext} secondary fluid size='large'>
                                Next
                            </Button>
                        </Segment>
                    </Form>

                    <Message>
                        New to us? <a href='https://github.com/carlosrodrih/Rewards'>Get info</a>
                    </Message>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check' />
                            Everything Worked Out!
                        </Header>
                        <Header.Subheader>Press anywhere to go back to Home Page</Header.Subheader>
                    </Dimmer>
                </Grid.Column>
            </Grid>
        )
        }else{
            return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

            <Grid.Column style={{ maxWidth: 450 }}>
                <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                <Header as='h2' color="black" textAlign='center' >
                    Import Your First Review
                </Header>
                <Form size='large'>


                    <Segment>
                       
                    <Form.Input fluid icon='linkify' value={reviewId} name='reviewId' iconPosition='left' placeholder='URL of your review' onChange={this.handleChangeInputReviewId}  required />
                        <Button onClick={this.handleIncludeReviewer} secondary fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                </Form>

                
                <Dimmer active={active} onClickOutside={this.handleClose} page>
                    <Header as='h2' icon inverted>
                        <Icon name='check' />
                        Everything Worked Out!
                    </Header>
                    <Header.Subheader>Press anywhere to go back to Home Page</Header.Subheader>
                </Dimmer>
            </Grid.Column>
        </Grid>
            )
        }
    }
}

export default LoginForm