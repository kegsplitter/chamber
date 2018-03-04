import * as Session from './client-session.js';

let socket;


export function setup(){
	return new Promise((resolve, reject)=>{

		if (socket) return resolve();

		socket = new WebSocket('ws://localhost:8765');

		socket.onerror = reject;
		socket.onopen = function(){
			console.log('socket opened');
			socket.send('hi');
			socket.send(JSON.stringify({one: 'hello', two: 'world'}))
		};
	});
}
