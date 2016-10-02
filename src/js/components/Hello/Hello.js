import React from 'react';

import styles from './Hello.scss';

const Hello = React.createClass({
	render() {
		return (
			<h1 className={styles.title}>Hello, world!</h1>
		);
	}
});

export default Hello;