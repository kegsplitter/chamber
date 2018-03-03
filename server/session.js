const JWT = require('jwt-simple');
let secret;

function createSketchyId(){
	return `${Date.now()}${Math.random()}`;
}

function addToSession(sessionObj, key, value){
	sessionObj[key] = value;
	sessionObj.timeStamp = Date.now();

	return sessionObj;
}

function removeFromSession(sessionObj, key){
	delete sessionObj[key];
	sessionObj.timeStamp = Date.now();

	return sessionObj;
}

function addValueToToken(token, key, value){
	let payload = getPayload(token);
	addToSession(payload, key, value);

	return getToken(payload);
}

function addValuesToToken(token, addObj){
	let payload = getPayload(token);
	Object.keys(addObj)
		.forEach(key => addToSession(payload, key, addObj[key]));

	return getToken(payload);
}


function getToken(payload){
	return JWT.encode(payload, secret);
}

function getPayload(token){
	return JWT.decode(token, secret);
}

function createSession(){
	let obj = addToSession({}, 'id', createSketchyId());

	return getToken(obj);
}

function removeValueFromToken(token, key){
	let payload = getPayload(token);
	removeFromSession(payload, key);
	return getToken(payload);
}

function removeValuesFromToken(token, keyList){
	let payload = getPayload(token);
	keyList.forEach(key => removeFromSession(payload, key));
	return getToken(payload);
}

function setSecret(passedSecret){
	secret = passedSecret;
}

// setup function
module.exports = {
		createSession: createSession,
		getToken: getToken,
		getPayload: getPayload,
		addValueToToken: addValueToToken,
		addValuesToToken: addValuesToToken,
		removeValueFromToken: removeValueFromToken,
		removeValuesFromToken: removeValuesFromToken,
		setSecret: setSecret
	};
