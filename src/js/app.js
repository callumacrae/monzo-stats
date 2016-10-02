import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello/Hello';

ReactDOM.render(
	<div>
		<Hello></Hello>
		<h1 className="title">This should not be blue</h1>
	</div>,
	document.getElementById('root')
);