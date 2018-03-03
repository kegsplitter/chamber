// use a real testing framework when you can be bothered
const Session = require('./session.js');
Session.setSecret('testingSecret');


let token = Session.createSession();

console.log(token);
console.log(Session.getPayload(token));

token = Session.addValueToToken(token, 'hawk', 'owl');

console.log(token);
console.log(Session.getPayload(token));

token = Session.addValuesToToken(token, {
	one: 'hello',
	two: 'world',
	three: {
		beThou: 'myVission'
	}
});

console.log(token);
console.log(Session.getPayload(token));

token = Session.removeValueFromToken(token, 'three');

console.log(token);
console.log(Session.getPayload(token));

token = Session.removeValuesFromToken(token, ['one', 'two', 'hawk']);

console.log(token);
console.log(Session.getPayload(token));
