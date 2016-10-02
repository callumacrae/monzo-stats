const storageName = 'monzo-stats';
const storage = JSON.parse(window.localStorage.getItem(storageName)) || {};

export function get(key) {
	return storage[key];
}

export function set(key, value) {
	storage[key] = value;
	window.localStorage.setItem(storageName, JSON.stringify(storage));
}

export function unset(key) {
	delete storage[key];
	window.localStorage.setItem(storageName, JSON.stringify(storage));
}
