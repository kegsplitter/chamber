const express = require('express');
const app = express();
const port = 9876;
const socketPort = 8765;
const secret = 'SECRETCODEPLEASECHANGEME19564728';
const Session = require('./session.js'); Session.setSecret(secret);
const socketServer = require('./ws-server.js');
socketServer.setup(socketPort);

app.use(require('body-parser').json());

app.post('/port/initSession', (request, response)=>{
	let token = Session.createSession();

	response.send({
		token : token
	});
});


// expose everything within the app folder
app.use(express.static(__dirname + '/../app/'));

app.listen(port, ()=> console.log(`Chamber. Listening on port ${port}`));
