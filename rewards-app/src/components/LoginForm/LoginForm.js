import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo-revlounge.png'
import api from '../../api'

class LoginForm extends Component {    

    constructor(props){
        super(props)    

        this.state = {
            name: '',
            surname: '',
            orcid:'',
            account: '',
            company: '',           
            location: '', 
            email: '',
        }//Si al final se añade la contraseña a la bd, añadir aqui un estado de password.
    }

    
    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })

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
        const account = event.target.value
        this.setState({ account })
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
    

    handleIncludeReviewer = async () => {
        const { name, surname, orcid, account, company, location, email } = this.state
        const payload = { name, surname, orcid, account, company, location, email }
        
        await api.insertReviewer(payload).then(res => {
            this.setState({
                name: '',
                surname: '',
                orcid: '',
                account: '',
                company: '',
                location: '',                
                email: '',
            })
            this.handleOpen()
        })
    }

    

    render() {
        const { name, surname, orcid, account,  company, location, email, active} = this.state
        
        return (
           
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Image as={Link} to='/' src={logo} centered size="medium"></Image>
                    <Header as='h2' color="black" textAlign='center' >
                        Register a new Reviewer
                    </Header>
                    <Form size='large'>

                  
                        <Segment>
                            <Form.Input fluid icon='user' name='name' value={name} iconPosition='left' placeholder='Name'  onChange={this.handleChangeInputName}/>
                            <Form.Input fluid icon='user' name='surname' value={surname} iconPosition='left' placeholder='Surname'  onChange={this.handleChangeInputSurname}/>
                            <Form.Input fluid icon='id card' iconPosition='left' name='orcid' value={orcid} placeholder='ORCID ID' onChange={this.handleChangeInputOrcid}/>
                            <Form.Input fluid icon='ethereum' iconPosition='left' name='ethereum-account' value={account} placeholder='Ethereum account' onChange={this.handleChangeInputAccount}/>
                            <Form.Input fluid icon='archive' name='company' value={company} iconPosition='left' placeholder='Company' onChange={this.handleChangeInputCompany}/>
                            <Form.Input fluid icon='map marker alternate' value={location} name='location' iconPosition='left' placeholder='Location' onChange={this.handleChangeInputLocation}/>
                            <Form.Input fluid icon='mail' value={email} name='email' iconPosition='left' placeholder='E-mail address' onChange={this.handleChangeInputEmail}/>
                            
                            <Form.Input
                                fluid
                                icon='lock'
                                name='password'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />
                            
                            <Button onClick={this.handleIncludeReviewer}secondary fluid size='large'>
                                Register
                            </Button>
                           
                        </Segment>
                    </Form>
                    
                    <Message>
                        New to us? <a href='https://github.com/carlosrodrih/Rewards'>Get info</a>
                    </Message>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='handshake outline' />
                            Successfully registered!
                        </Header>
                    </Dimmer>
                </Grid.Column>
            </Grid>
        )
    }
}

export default LoginForm