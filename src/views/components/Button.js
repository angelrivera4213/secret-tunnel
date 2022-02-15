import cx from 'classnames';
import { createElement } from '../lib/utils';

export default function Button ({
	className,
	attributes,
	style
} = {}) {
	const button = createElement('button', {
		className: cx('rounded-full', className),
		attributes,
		style
	});

	return button;
}