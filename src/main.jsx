import React from 'react';
import ReactDOM from 'react-dom';
import * as Setup from './client-setup.js';

import Chamber from './Chamber.jsx';

let setupPromise = Setup.setup().then(token => console.log(token));


// router and all that will be setup here at some point
// for now just setup chamber
function mainLayout(){
	return(
		<div>
			<Chamber></Chamber>
		</div>	
	);
}


setupPromise.then(token => {
	ReactDOM.render(mainLayout(), document.querySelector('#app'));
})
