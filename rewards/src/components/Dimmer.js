import React, { Component } from 'react'
import { Button, Dimmer, Header, Icon } from 'semantic-ui-react'

export default class DimmerExamplePage extends Component {
  state = {}

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  render() {
    const { active } = this.state

    return (
      <div>
        <Button
          content='Need help?'
          labelPosition='left'
          onClick={this.handleOpen}
        />

        <Dimmer active={active} onClickOutside={this.handleClose} page>
          <Header as='h2' icon textAlign='center' inverted>
            <Icon name='ethereum' />
            Tip
            <Header.Subheader>
                Send an ethereum donation.
            </Header.Subheader>
          </Header>
          <Header as='h2' icon  textAlign='center' inverted>
            <Icon name='thumbs up' />
            Say Thanks
            <Header.Subheader>
                Send a reputation token.
            </Header.Subheader>
          </Header>
          <Header as='h2' icon  textAlign='center' inverted>
            <Icon name='trophy' />
            Reward
            <Header.Subheader>
                Send an unique reward. You can select between three categories.
            </Header.Subheader>
          </Header>
        </Dimmer>
      </div>
    )
  }
}
