
import React from 'react'
import { Button, Form, Grid, Icon, Popup, Image, Message, Segment, Input, Header, Statistic, Divider, Label } from 'semantic-ui-react'
import Dimmer from './Dimmer'
import 'semantic-ui-css/semantic.min.css';
import logo from '../assets/logo-revlounge.png'
import Web3 from 'web3'
import Identicon from 'identicon.js'

const stc = require('string-to-color');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'http' })
const md5 = require('md5')

function createHash(from, to, type, idreview) {
    let award = from;
    award = award.concat(type);
    award = award.concat(to);
    award = award.concat(idreview);
    return md5(award);
}

// https://ipfs.infura.io/ipfs/"
function uploadIPFS(award, type, giveAward) {
    var buf = Buffer.from(award, 'base64');
    var awardHash = "https://ipfs.infura.io/ipfs/"
    ipfs.add(buf, (error, result) => {
        awardHash = awardHash.concat(result[0].hash)
        giveAward(type, awardHash);
        if (error) {
            console.error(error)
            return
        }
    })
}


const Rewards = ({ tipReviewer, sayThanks, giveAward, reputation, reviews, golds, silvers, bronzes, from, to, name, reviewid, tipper }) => {
    const inputRef = React.createRef();
    var active = false;
    var amount = 0;
    return (
        <div>
            <Grid textAlign='center' columns={2} style={{ height: '100vh' }} verticalAlign='top'>
                <Grid.Row></Grid.Row>
                <Grid.Column style={{ maxWidth: 480 }}>
                    <Segment>
                        <Form size='large'>

                            <Image src={logo} centered size='medium' />
                            <Header as='h3' textAlign='left'>Your information:</Header>
                            <Segment textAlign='center'>{from}</Segment>
                            <Segment textAlign='center'>
                                {(tipper === '') ? (<div><p>You are not registered in RevLounge.
                                Join us if you are a reviewer and want to star winning reputation and unique rewards!</p>
                                    <Button href="http://localhost:3001/join" >Register</Button></div>) :
                                    (<div>
                                        <Image spaced='right' src={`https://eu.ui-avatars.com/api/?name=${tipper}+&size=512&background=${stc(from).substring(1)}&color=ffff`} avatar />
                                        <span>{tipper}</span>
                                    </div>
                                    )}
                            </Segment>
                            <div className="ui three buttons">
                                <Popup trigger={<Button animated='vertical'
                                    basic color="black"
                                >
                                    <Button.Content hidden>Tip!</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='ethereum' />
                                    </Button.Content></Button>} on='click'>
                                    <Input>
                                        <input type='text' ref={inputRef} placeholder='Ether amount...' onChange={() => {
                                            amount = inputRef.current.value
                                        }} />
                                        <Button type='submit' onClick={() => {
                                            let tip = Web3.utils.toWei(amount.toString(), "ether");
                                            console.log(tip);
                                            tipReviewer(0, tip, to)
                                        }}>Tip!</Button>
                                    </Input>
                                </Popup>
                                <Button
                                    animated='vertical'
                                    basic color="blue"
                                    onClick={() => {
                                        sayThanks(0, to)
                                    }}>
                                    <Button.Content hidden>Say thanks!</Button.Content>
                                    <Button.Content visible >
                                        <Icon name='thumbs up' />
                                    </Button.Content>
                                </Button>
                                <Popup wide='very' trigger={<Button animated='vertical'
                                    basic color="green"
                                >
                                    <Button.Content hidden>Reward!</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trophy' />
                                    </Button.Content></Button>} on='click'>
                                    <Grid divided columns='equal'>
                                        <Grid.Column>
                                            <Popup
                                                trigger={
                                                    <Button color='yellow' content='Gold' fluid
                                                        onClick={() => {
                                                            var award = createHash(from, to, 0, reviewid);
                                                            console.log(award);
                                                            let options = {
                                                                background: [255, 215, 0, 255],         // rgba white
                                                                margin: 0.2,                              // 20% margin
                                                                size: 30,                                // 420px square
                                                                format: 'png'                             // use SVG instead of PNG
                                                            };
                                                            var identicon = new Identicon(award, options).toString()
                                                            uploadIPFS(identicon, 0, giveAward)
                                                        }} />
                                                }
                                                content='Give a GOLD award to the reviewer.'
                                                position='top center'
                                                size='tiny'
                                                inverted
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Popup
                                                trigger={<Button color='grey' content='Silver' fluid
                                                    onClick={() => {
                                                        var award = createHash(from, to, 1, reviewid);
                                                        let options = {
                                                            background: [192, 192, 192, 255],         // rgba silver
                                                            margin: 0.2,                              // 20% margin
                                                            size: 30,                                // 420px square
                                                            format: 'png'                             // use SVG instead of PNG
                                                        };
                                                        var identicon = new Identicon(award, options).toString()
                                                        uploadIPFS(identicon, 1, giveAward)
                                                    }} />}
                                                content='Give a SILVER award to the reviewer.'
                                                position='top center'
                                                size='tiny'
                                                inverted
                                            />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Popup
                                                trigger={<Button color='brown' content='Bronce' fluid
                                                    onClick={() => {
                                                        var award = createHash(from, to, 2, reviewid);
                                                        let options = {
                                                            background: [205, 127, 50, 255],         // rgba bronce
                                                            margin: 0.2,                              // 20% margin
                                                            size: 30,                                // 420px square
                                                            format: 'png'                             // use SVG instead of PNG
                                                        };
                                                        var identicon = new Identicon(award, options).toString()
                                                        uploadIPFS(identicon, 2, giveAward)
                                                    }} />}
                                                content='Give a BRONCE award to the reviewer.'
                                                position='top center'
                                                size='tiny'
                                                inverted
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Popup>
                            </div>

                        </Form>
                    </Segment>
                    <Message >
                        <Dimmer></Dimmer>
                    </Message>
                </Grid.Column>
                <Grid.Column style={{ maxWidth: 480 }}>
                    <Segment>
                        {(name !== '') ? (<div>
                            <Header as='h3' textAlign='left' dividing>
                                You are rewarding this reviewer:
                            </Header>
                            <Segment textAlign='left'>
                                <Image spaced='right' size='tiny' src={`https://eu.ui-avatars.com/api/?name=${name}+&size=512&background=${stc(to).substring(1)}&color=ffff`} avatar />
                                <span>{name}</span>
                                <Divider ></Divider>
                                <Statistic.Group widths='3' size="mini">
                                    <Statistic>
                                        <Statistic.Label>Reviews</Statistic.Label>
                                        <Statistic.Value>
                                            <Label basic>
                                                {reviews}
                                            </Label>
                                        </Statistic.Value>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Label>Reputation</Statistic.Label>
                                        <Statistic.Value>
                                            <Label color='blue'>
                                                {reputation}
                                            </Label>
                                        </Statistic.Value>
                                    </Statistic>
                                    <Statistic>
                                        <Statistic.Label>Rewards</Statistic.Label>
                                        <Statistic.Value>
                                            <Label color='yellow'>
                                                {golds.length}
                                            </Label>
                                            <Label color='grey'>
                                                {silvers.length}
                                            </Label>
                                            <Label color='brown'>
                                                {bronzes.length}
                                            </Label>
                                        </Statistic.Value>
                                    </Statistic>
                                </Statistic.Group>
                            </Segment>
                            <Header as='h3' textAlign='left'>For this review:</Header><a href={reviewid}>{reviewid}</a>
                            <Header as='h3' textAlign='left'>Review rewards:</Header>
                            <Divider></Divider>
                            <Grid>
                                <Grid.Row columns='3' divided>
                                    <Grid.Column>
                                        <Segment raised inverted color='yellow' textAlign='center' size='small' fluid>Gold</Segment>
                                        <Image.Group>
                                            {golds.map((gold, key) => {
                                                if (gold.reviewId === reviewid) {
                                                    return (
                                                        <Popup
                                                            trigger={<Image key={key}
                                                                size="mini"
                                                                src={gold.hashIPFS}
                                                                href={gold.hashIPFS}
                                                            />}
                                                            inverted
                                                        >
                                                            <p>Gold Award Received!</p>
                                                            <p>From: {gold.sender}</p>
                                                            <p>To: {name}</p>
                                                        </Popup>
                                                    )
                                                }
                                            })
                                            }
                                        </Image.Group>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment raised inverted color='grey' textAlign='center' size='small' fluid>Silver</Segment>
                                        <Image.Group>
                                            {silvers.map((silver, key) => {
                                                if (silver.reviewId === reviewid) {
                                                    return (
                                                        <Popup
                                                            trigger={<Image key={key}
                                                                size="mini"
                                                                src={silver.hashIPFS}
                                                                href={silver.hashIPFS}
                                                            />}
                                                            inverted
                                                        >
                                                            <p>Silver Award Received!</p>
                                                            <p>From: {silver.sender}</p>
                                                            <p>To: {name}</p>
                                                        </Popup>
                                                    )
                                                }
                                            })
                                            }
                                        </Image.Group>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment raised inverted color='brown' textAlign='center' size='small' fluid>Bronze</Segment>
                                        <Image.Group>
                                            {bronzes.map((bronze, key) => {
                                                if (bronze.reviewId === reviewid) {
                                                    return (
                                                        <Popup
                                                            trigger={<Image key={key}
                                                                size="mini"
                                                                src={bronze.hashIPFS}
                                                                href={bronze.hashIPFS}
                                                            />}
                                                            inverted
                                                        >
                                                            <p>Bronze Award Received!</p>
                                                            <p>From: {bronze.sender}</p>
                                                            <p>To: {name}</p>
                                                        </Popup>
                                                    )
                                                }
                                            })
                                            }
                                        </Image.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>) : (<div></div>)}
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Rewards