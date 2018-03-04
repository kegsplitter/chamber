const Session = require('./session.js');
const WS = require('ws');
let severPort;
let socketServer;



function createEventHandling(){
	socketServer.on('connection', function(socket){
		socket.on('message', function(message){
			console.log('message', message);
		});
	});
}

function setup(port){
	severPort = port;

	socketServer = new WS.Server({
		port: port
	});

	createEventHandling();	
}


module.exports = {
	setup: setup
};
