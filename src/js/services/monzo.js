import qs from 'querystring';
import config from '../config';
import * as storage from '../helpers/storage-wrapper';

function wrappedFetch(url, options = {}) {
	if (!options.headers) {
		options.headers = new Headers();
	}

	if (!(options.headers instanceof Headers)) {
		options.headers = new Headers(options.headers);
	}

	options.headers.set('Authorization', `Bearer ${storage.get('auth').accessToken}`);

	return fetch(config.MONZO_API_URL + url, options)
		.then((res) => res.json());
}

export function get(url, body) {
	if (body) {
		url += '?' + qs.stringify(body);
	}

	return wrappedFetch(url);
}

export function post(url, body) {
	return wrappedFetch(url, {
		method: 'POST',
		body
	});
}

export function ping() {
	return get('/ping/whoami');
}

export function getAccounts(useCached = true) {
	if (useCached) {
		const accounts = storage.get('accounts');

		if (accounts) {
			return Promise.resolve(accounts);
		}
	}

	return get('/accounts')
		.then((accounts) => {
			storage.set('accounts', accounts);
			return accounts;
		});
}

export function listTransactions(account_id) {
	if (!account_id) {
		return getAccounts()
			.then((accounts) => listTransactions(accounts.accounts[0].id));
	}

	return get('/transactions', { account_id });
}