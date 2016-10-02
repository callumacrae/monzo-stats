import React from 'react';

import Hello from './Hello/Hello';

export default React.createClass({
	render() {
		return (
			<div className="container">
				<Hello></Hello>
				<h1 className="title">This should not be blue</h1>
			</div>
		);
	}
});