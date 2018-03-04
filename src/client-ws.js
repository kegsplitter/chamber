import * as Session from './client-session.js';
import {Observable} from 'rxjs/Observable';
import {Subject}    from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

let socket;

const outRouteInput = new Subject();

export function addRoute(route){
	return outRouteInput.asObservable().filter(message => message.route === route);
}

function handleMessages(event){
	
	let message = JSON.parse(event.data);
	outRouteInput.next(message);
}

export function sendMessage(route, message){
	let obj = {
		route: route,
		token: Session.getToken()
	};

	Object.keys(message).forEach(key => obj[key] = message[key]);

	socket.send(JSON.stringify(obj));
}

export function setup(){
	return new Promise((resolve, reject)=>{

		if (socket) return resolve();

		socket = new WebSocket('ws://localhost:8765');

		socket.onerror = reject;
		socket.onmessage = handleMessages;
		
		socket.onopen = function(){
			resolve();
		};
	});
}

export function initWebSocketSession(){
	sendMessage('initWebSocketSession', {});
}