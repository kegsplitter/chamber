import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component{
	render(){
		return (<div>HELLO WORLD</div>);
	}
}



ReactDOM.render(<Test></Test>, document.querySelector('#app'));
