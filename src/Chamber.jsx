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
    
    WebSocket.addRoute('chat-all').subscribe(m => this.addAllChat(m));
	}

  cloneState(){
    let newState = Object.assign({}, this.state);
    newState.messageList = newState.messageList.slice();

    return newState;
  }

  addAllChat(message){

    let newState = this.cloneState();

    newState.messageList.push((
      <div class='chat-message'>{message.chatMessage}</div>
    ));

    this.setState(newState);
  }

	componentWillUnmount(){
		this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
  
  submitMessage(){
    
    let messageObject = {
      chatMessage: this.state.currentInputText
    };

    WebSocket.sendMessage('chat-all', messageObject);

    let nextState = this.cloneState();
    nextState.currentInputText = '';

    this.setState(nextState)
  }

  handleInputChange(event){
    let nextState = this.cloneState();
    nextState.currentInputText = event.target.value;

    this.setState(nextState);
  }

	render(){
    
		return (
      <div class='chamber'>
        <div class='message-panel'>
          {this.state.messageList}
        </div>
        <div class='input-panel'>
          <input type='text' value={this.state.currentInputText} onChange={this.handleInputChange.bind(this)}/>
          <button onClick={()=> this.submitMessage()}>Send</button>
        </div>
      </div>);
	}
}
