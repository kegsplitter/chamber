import React from 'react';
import * as WebSocket from './client-ws.js';
import {Observable} from 'rxjs/Observable';

export default class Chamber extends React.Component{

	constructor(props){
		super(props);
		
    this.subscriptionList = [];
    
    this.state = {
      currentInputText: '',
      messageList: []
    }
    
		WebSocket.setup().then(()=> WebSocket.initWebSocketSession());
	}

	componentWillUnmount(){
		this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
  
  submitMessage(){
    
    let messageObject = {
      chatMessage: this.state.currentInputText
    };

    WebSocket.sendMessage('chat-all', messageObject);

    let nextState = {
      currentInputText: '',
      messageList: this.state.messageList.slice()
    }

    this.setState(nextState)
  }

  handleInputChange(event){
    let nextState = {
      currentInputText: event.target.value,
      messageList: this.state.messageList.slice()
    }

    this.setState(nextState);
  }

	render(){
    
		return (
      <div class='chamber'>
        <div class='message-panel'>

        </div>
        <div class='input-panel'>
          <input type='text' value={this.state.currentInputText} onChange={this.handleInputChange.bind(this)}/>
          <button onClick={()=> this.submitMessage()}>Send</button>
        </div>
      </div>);
	}
}
