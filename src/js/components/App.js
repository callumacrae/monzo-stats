import qs from 'querystring';
import React from 'react';

import * as monzoAuth from '../services/monzo-auth';
import * as monzo from '../services/monzo';

import Sidebar from './ecosystems/Sidebar/Sidebar';
import Main from './ecosystems/Main/Main';

export default React.createClass({
	getInitialState: function () {
		let authState;

		if (monzoAuth.isAuthed()) {
			authState = 2;
		} else {
			authState = window.location.pathname === '/oauth/callback' ? 1 : 0;
		}

		return {
			authState, // 0 = unauthed, 1 = exchanging auth code, 2 = authed
			transactions: []
		};
	},
	componentDidMount() {
		monzo.listTransactions()
			.then((transactions) => {
				this.setState(transactions);
			});
	},
	render() {
		if (this.state.authState === 0) {
			return (
				<a href={monzoAuth.redirectUrl()}>Click here to auth</a>
			);
		}

		if (this.state.authState === 1) {
			const parsedSearch = qs.parse(window.location.search.slice(1));
			monzoAuth.handleCallback(parsedSearch.code, parsedSearch.state)
				.then(() => {
					history.pushState(null, null, '/');
					this.setState({ authState: 2 });
				});

			return (
				<p>Hang on a second…</p>
			);
		}

		return (
			<div>
				<Sidebar transactions={this.state.transactions} />
				<Main transactions={this.state.transactions} />
			</div>
		);
	}
});