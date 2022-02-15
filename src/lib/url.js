export default function url(options = {}) {
    let {
        host,
        path,
        protocol = 'http:',
        query
    } = options;

    if (!protocol.endsWith(':')) {
        protocol = `${protocol}:`;
    }

    const resource = new URL(`${protocol}//${host}`);
    resource.pathname = path;
    resource.search = new URLSearchParams(query);

    return resource.href;
}