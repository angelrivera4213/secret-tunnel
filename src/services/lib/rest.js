import buildUrl from '../../lib/url';

export default async function rest(url, method, headers = {}, body, resourceConfig = {}) {
	const resource = buildUrl(url);

	const { credentials, format } = resourceConfig;

	const settings = {
		credentials,
		headers,
		method
	};

	if (body) {
		settings.body = body;
	}

	const response = await fetch(resource, settings);

	const { status, statusText } = (response || {});
	const success = status >= 200 && status < 300;
	
	if (!success) {
		const error = new Error(statusText);
		error.response = response;
		throw error;
	}

	if (format === 'text') {
		const body = await response.text();
		return body.split('\n');
	}

	return await response.json();
}