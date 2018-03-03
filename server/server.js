const express = require('express');
const app = express();
const port = 9876;
const secret = 'SECRETCODEPLEASECHANGEME19564728';


app.listen(port, ()=> console.log(`Chamber. Listening on port ${port}`));
