const tokenStorageKey = 'sessionToken';

// TODO: make sure that time stamp is higher then the timestamp of the current storage key before setting
export function setToken(token){
	window.localStorage.setItem(tokenStorageKey, token);
}

export function getToken(){
	return window.localStorage.getItem(tokenStorageKey);
}

export function getPayload(){
	let token = getToken();
	let payload = token.split('.')[1];
	payload = atob(payload);
	return JSON.parse(payload);
}
