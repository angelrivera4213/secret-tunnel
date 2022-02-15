// Dependencies
import cx from 'classnames';
import { createElement, setAttributes } from '../lib/utils';


// Selectors
import { getContentId, getImage, getText, imageKeyByType, getType } from '../../selectors/content';
import { getImageByKeyVersion, getUrl } from '../../selectors/image';
import { getTextByKey, getTextContent } from '../../selectors/text';

// Components
import Image from './Image';

export default function Tile ({
	className,
	attributes,
	style,
	tile
} = {}) {
	console.log('tile', tile);
	const contentId = getContentId(tile);
	const type = getType(tile);
	const text = getText(tile);
	const title = getTextByKey(text, 'title');
	const titleContent = getTextContent(title) || '';
	const image = getImageByKeyVersion(
		getImage(tile),
		'tile',
		imageKeyByType[getType(tile)],
		'1.78'
	);
	const imageUrl = getUrl(image);

	const element = createElement('button', {
		className: cx('tile group snap-center p-[1.25vw] md:p-[1vw] lg:p-[0.75vw] focus:outline-none', className),
		attributes: Object.assign({
			'data-tile-content-id': contentId
		}, attributes),
		style
	});

	const imageWrapper = createElement(
		'div',
		{
			className: `
				relative tile-img-wrapper  min-h-full rounded-md
				bg-gradient-to-r from-zinc-600 to-zinc-700 
				w-[50vw] md:w-[25vw] lg:w-[20vw]
				h-[30vw] md:h-[15vw] lg:h-[12vw]
			`
		}
	);

	const hiddenImage = Image({
		className: 'invisible rounded-md h-full w-full fill',
		src: imageUrl,
		alt: titleContent
	});
	const tileImageContainer = createElement(
		'div',
		{
			className: `
				absolute inset-0 rounded-md h-full w-full group-focus:scale-105 group-hover:scale-105
				transition-[transform] duration-700 bg-gradient-to-r from-zinc-600 to-zinc-700
				after:content-[''] after:absolute after:z-10 after:bg-transparent after:border-0 after:border-slate-50 after:opacity-0
				after:transition-opacity after:duration-700
				after:box-border after:rounded-md after:w-full after:h-full
				after:group-focus:border-4 after:group-hover:border-4
				after:group-focus:opacity-80 after:group-hover:opacity-80
				after:inset-0
			`
		}
	);
	const tileImage = Image({
		className: 'rounded-md h-full w-full fill',
		src: imageUrl,
		alt: titleContent
	});

	imageWrapper.appendChild(hiddenImage)
	tileImageContainer.appendChild(tileImage);
	imageWrapper.appendChild(tileImageContainer);
	element.appendChild(imageWrapper);

	return element;
}