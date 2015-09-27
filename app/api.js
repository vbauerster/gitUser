import 'fetch';

var gitUser = function gitUser(login) {
	let url = `https://api.github.com/users/${login}`;
	return fetch(url).then(response => response.json());
};

export {gitUser};
