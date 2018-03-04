import React from 'react';
import * as WebSocket from './client-ws.js';


export default class Chamber extends React.Component{

	constructor(props){
		super(props);
		WebSocket.setup();
	}

	render(){
		return (<div>Chamber</div>);
	}
}
