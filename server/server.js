const express = require('express');
const app = express();
const port = 9876;
const secret = 'SECRETCODEPLEASECHANGEME19564728';
const Session = require('./session.js'); Session.setSecret(secret);

// expose everything within the app folder
app.use(express.static(__dirname + '/../app/'));

app.listen(port, ()=> console.log(`Chamber. Listening on port ${port}`));
