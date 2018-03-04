import * as Session from './client-session.js';
import * as Port from './client-port.js';

function initSession(){
	return fetch('/port/initSession', {
		method: 'post',
		headers: Port.getDefaultHeaders()
	})
	.then(response => response.json())
	.then(response => {
		Session.setToken(response.token);
		return response.token;
	});
}


export function setup(){
	// check to see if we have a session
	let token = Session.getToken();

	let promiseChain = Promise.resolve(token);

	if(!token) promiseChain = promiseChain.then(initSession());

	return promiseChain;
}
