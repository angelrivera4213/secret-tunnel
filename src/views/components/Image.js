import cx from 'classnames';
import { createElement } from '../lib/utils';

export default function Image ({
	alt,
	attributes,
	className,
	src,
	style
} = {}) {
	const image = createElement(src ? 'img' : 'div', {
		className,
		attributes,
		style
	});

	if (src) {
		image.src = src;

		image.onerror = () => {
			image?.parentNode?.removeChild?.(image);
		}
	}

	if (alt) {
		image.alt = alt;
	}

	return image;
}
