import cx from 'classnames';
import { createElement } from '../../lib/utils';

// Selectors
import { getText, getItems, getSetId, getTextByKey, getType, getContentClass } from '../../../selectors/set';
import { getTextContent } from '../../../selectors/text';

// Components
import Text from '../Text';
import TileList from '../TileList';

export default function StandardSet (set, {
	className,
	attributes,
	style
} = {}) {
	// Get Data
	const type = getType(set);
	const text = getText(set);
	const setId = getSetId(set);
	const items = getItems(set) || [];
	const contentClass = getContentClass(set);
	const title = getTextByKey(text, 'title', 'full');
	const titleContent = getTextContent(title) || '';
	attributes = {
		...attributes,
		'data-set-type': type,
		'data-set-id': setId
	};

	const element = createElement('div', {
		className: cx('set py-6', className),
		attributes,
		style
	});

	const titleWrapper = createElement('div', {
		className: 'pb-3 pl-12'
	});
	const titleElem = Text({
		className: 'pl-3 text-slate-50',
		text: titleContent
	});
	const tileList = TileList({
		tiles: items
	});


	titleWrapper.appendChild(titleElem);
	element.appendChild(titleWrapper);
	element.appendChild(tileList);

	return element;
}