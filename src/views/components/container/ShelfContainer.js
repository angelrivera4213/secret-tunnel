import cx from 'classnames';
import { createElement } from '../../lib/utils';

// Selectors
import { getSet, getStyle, getType } from '../../../selectors/container';

// Components
import Set from '../set';

export default function ShelfContainer (container, {
	className,
	attributes,
	style
} = {}) {
	const containerStyle = getStyle(container);
	const containerType = getType(container);
	const set = getSet(container);
	
	const element = createElement('div', {
		className: cx(className),
		attributes: {
			...attributes,
			'data-container-type': containerType
		},
		style
	});

	const setNode = Set(set);
	element.appendChild(setNode);

	return element;
}
