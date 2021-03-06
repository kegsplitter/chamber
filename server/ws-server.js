const Session = require('./session.js');
const WS = require('ws');
let severPort;
let socketServer;

let socketHash = {};

// TODO: implement id remove from socket has as well as ping/pong connection detection

function initWebSocketSession(socket, message){
	let payload = Session.getPayload(message.token);

	socketHash[payload.id] = socket;
}

function cleanToken(message){
  let payload = Session.getPayload(message.token);

  message = Object.assign({}, message, {sourceId: payload.id});
  delete message.token;

  return message;
}

function chatAll(message){
  
  message = cleanToken(message);

  message = JSON.stringify(message);

  Object.keys(socketHash).map(key => socketHash[key]).forEach(socket => socket.send(message));
}

function createEventHandling(){
	socketServer.on('connection', function(socket){console.log('websocket Connection');
		socket.on('message', function(message){
			
			try{
				message = JSON.parse(message);
			} catch(e){
				console.log(e);
				return;
			}
			
			// to set up the person id
      if(message.route === 'initWebSocketSession') return initWebSocketSession(socket, message);
      if(message.route === 'chat-all') return chatAll(message);

		});
		socket.on('error', (error)=> console.log('Socket error', error));
	});

	socketServer.on('error', (error)=>console.log('socketServer Error ', error));
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
