import React from 'react';
import * as WebSocket from './client-ws.js';
import {Observable} from 'rxjs/Observable';

export default class Chamber extends React.Component{

	constructor(props){
		super(props);
		
		this.subscriptionList = [];

		WebSocket.setup().then(()=> WebSocket.initWebSocketSession());
	}

	componentWillUnmount(){
		this.subscriptionList.forEach(sub => sub.unsubscribe());
	}

	render(){
		return (<div>Chamber</div>);
	}
}
