import buildUrl from '../../lib/url';

export default async function rest(url, method, headers = {}, body, resourceConfig = {}) {
    const resource = buildUrl(url);

    const { credentials, format, timeout = 1500 } = resourceConfig;

    const settings = {
        credentials,
        headers,
        method
    };

    if (body) {
        settings.body = body;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    settings.signal = controller.signal;


    const response = await fetch(resource, settings);

    clearTimeout(timeoutId);

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