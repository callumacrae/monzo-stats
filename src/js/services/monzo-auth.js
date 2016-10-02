import qs from 'querystring';
import camelize from 'camelize';
import config from '../config';
import * as storage from '../helpers/storage-wrapper';

export function isAuthed() {
	return !!storage.get('auth');
}

export function redirectUrl() {
	let stateCode;
	if (storage.get('auth-state-code')) {
		stateCode = storage.get('auth-state-code');
	} else {
		stateCode = Math.random().toString().slice(2);
		storage.set('auth-state-code', stateCode);
	}

	const data = {
		client_id: config.MONZO_CLIENT_ID,
		redirect_uri: 'http://localhost:8080/oauth/callback',
		response_type: 'code',
		state: stateCode
	};


	return config.MONZO_AUTH_API_URL + '?' + qs.stringify(data);
}

export function handleCallback(authCode, state) {
	if (state !== storage.get('auth-state-code')) {
		return Promise.reject('BAD_STATE');
	}

	const data = {
		grant_type: 'authorization_code',
		client_id: config.MONZO_CLIENT_ID,
		client_secret: config.MONZO_CLIENT_SECRET,
		redirect_uri: 'http://localhost:8080/oauth/callback',
		code: authCode
	};

	fetch(config.MONZO_API_URL + '/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: qs.stringify(data)
	})
		.then((res) => res.json())
		.then(function (data) {
			if (data.error) {
				throw new Error('API error', data);
			}

			storage.unset('auth-state-code');
			storage.set('auth', camelize(data));
			storage.set('auth-expiry', Date.now() + data.expires_in * 1000);
		});
}