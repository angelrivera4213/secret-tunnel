import cx from 'classnames';
import { createElement } from '../../lib/utils';

// Selectors
import { getText, getRefId, getTextByKey, getRefIdType, getType, getContentClass } from '../../../selectors/set';
import { getTextContent } from '../../../selectors/text';

// Components
import Text from '../Text';

export default function RefSet (set, {
	className,
	attributes,
	style
} = {}) {
	// Get Data
	const type = getType(set);
	const text = getText(set);
	const contentClass = getContentClass(set);
	const title = getTextByKey(text, 'title', 'full');
	const titleContent = getTextContent(title) || '';
	const refId = getRefId(set);
	const refIdType = getRefIdType(set)

	const element = createElement('div', {
		className: cx('set py-6 hidden', className),
		attributes: {
			...attributes,
			'data-ref-id-type': refIdType,
			'data-ref-id': refId
		},
		style
	});

	const titleWrapper = createElement('div', {
		className: 'pb-3 pl-12'
	});
	const titleElem = Text({
		className: 'pl-3 text-slate-50',
		text: titleContent
	});

	titleWrapper.appendChild(titleElem);
	element.appendChild(titleWrapper);

	return element
}