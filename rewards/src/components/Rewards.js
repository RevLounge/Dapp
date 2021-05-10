
import React from 'react'
import { Button, Form, Grid, Icon, Popup, Image, Message, Segment, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import logo from '../assets/logo-revlounge.png'
import Web3 from 'web3'
import Identicon from 'identicon.js'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'http' })
const md5 = require('md5')

function createHash(from, to, type, idreview) {
    let award = from;
    award = award.concat(type);
    award = award.concat(from);
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


const Rewards = ({ tipReviewer, sayThanks, giveAward, from, to, reviewid }) => {
    const inputRef = React.createRef();
    var amount = 0;
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 480 }}>
                <Image src={logo} />
                <Form size='large'>
                    <Segment>
                        <Segment textAlign='left'>From: {from}</Segment>
                        <Segment textAlign='left'>To: {to}</Segment>

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
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='https://github.com/carlosrodrih/Rewards' ><Icon name='github' color='black'></Icon></a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Rewards