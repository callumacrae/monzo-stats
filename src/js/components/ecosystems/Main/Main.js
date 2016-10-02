import React from 'react';

const render = (props) => (
	<main className={props.className}>
		<h1 style={{ marginTop: 0 }}>{ props.transactions.length ? 'loaded!' : 'loading…' }</h1>
	</main>
);

export default render;