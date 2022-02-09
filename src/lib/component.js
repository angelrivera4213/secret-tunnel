export const createTemplate = (v = 'template') => document?.createElement(v);

export function htmlToElement(html = '') {
    const template = createTemplate();
    html = html?.trim(); // Never return a text node of whitespace as the result

    // can add policy for sanitizing html that's passed in 
    template.innerHTML = html;
    return template.content.firstChild;
}

export function render (value, container) {
	if (value === undefined || value === null) {
		const node = container?.firstChild;

		while (node) {
			const next = node.nextSibling;
			node.remove();
			node = next;
		}
    }

    container?.appendChild(htmlToElement(value));
}