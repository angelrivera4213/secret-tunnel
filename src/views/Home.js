import View from './lib/View';

import {
	getContainers,
	getCollectionId,
	getCollection
} from '../selectors/collection';
import {
	getSet,
	getType,
	TYPE_SHELF_CONTAINER
} from '../selectors/container';
import {
	getText,
	getItems,
	getSetId
} from '../selectors/set';
import {
	getTextContent,
	getTextByKey
} from '../selectors/text';
import {
	getContentId,
	getImage,
	getVideoText,
	imageKeyByType
} from '../selectors/video';
import {
	getImageByKeyVersion,
	getUrl
} from '../selectors/image';
import {
	STANDARD_COLLECTION_TYPE
} from '../selectors/types';

class Home extends View {
	mount (props = {}, context) {
		const {
			backgroundColor = '000',
			className = '',
			text
		} = props;
		this.root = this.createElement('div', `min-h-screen bg-neutral-900 text-xl`);
	}

	_createButton ({
		text,
		className,
	} = {}) {
		const button = this.createElement('button', `rounded-full ${className}`);
		const buttonText = this.createElement('span');
		buttonText.textContent = text || '';
		button.appendChild(buttonText)

		return button;
	}

	getRoot () {
		return this.root;
	}

	unmount (props = {}, root, context) {
		// any set timeouts or set intervals

	}

	rehydrate (root, context) {

	}

	dehydrate (root, context) {

	}

	loadHome (data) {
		this._collection = this._createCollectionNode(getCollection(data, 'StandardCollection'));

		this.root.appendChild(this._collection);
	}

	_createCollectionNode (collection) {
		// Create element 
		const element = this.createElement('div', 'collection');

		// Get Data
		const collectionId = getCollectionId(collection);
		const containers = getContainers(collection) || [];

		// Create Children Set
		for (const container of containers) {
			const set = getSet(container);
			const setNode = this._createSetNode(set);

			element.appendChild(setNode);
		}

		return element;
	}

	_createSetNode = (set) => {
		// Create Element 
		const element = this.createElement('div', 'set py-6');

		// Get Data
		const setId = getSetId(set);
		const items = getItems(set) || [];
		const text = getText(set);
		const title = getTextByKey(text, 'title');
		const titleContent = getTextContent(title) || '';

		// Adjust Set
		element.setAttribute('data-set-id', setId);

		const titleWrapper = this.createElement('div', 'pb-6 pl-12');
		const titleElem = this.createElement('span', 'text-slate-50');
		titleWrapper.appendChild(titleElem);
		titleElem.innerText = titleContent;
		element.appendChild(titleWrapper);
		
		const itemsContainer = this.createElement('div', 'item-container flex overflow-auto pl-12');

		console.log('this.root.clientWidth', this.root.clientWidth);

		if (items?.length > 0) {
			// create item nodes
			for (const item of items) {
				const itemNode = this._createTileNode(item);
				itemsContainer.appendChild(itemNode);
			}

			element.appendChild(itemsContainer);

			return element;
		}

		return this.createElement('div', 'empty-ref-set')
	}

	_createTileNode (video) {
		console.log('video', video);
		const element = this.createElement('div', 'tile');

		const contentId = getContentId(video) || getCollectionId(video);

		const image = getImageByKeyVersion(
			getImage(video),
			'tile',
			imageKeyByType[getType(video)],
			'1.78'
		);

		console.log('image', image);
		const imageUrl = getUrl(image);
		const text = getVideoText(video);
		const title = getTextByKey(text, 'title');
		const titleContent = getTextContent(title) || '';

		element.setAttribute('data-tile-content-id', contentId);

		const imageWrapper = this.createElement('div', 'tile-img-wrapper overflow-hidden rounded-md mr-8 w-64 md:w-80 lg:w-96');
		
		const tileImage = this.createElement('img');
		if (imageUrl) {
			tileImage.src = imageUrl;
		}
		tileImage.alt = titleContent;

		console.log('tileImage', tileImage);
		console.log('imageUrl', imageUrl);

		imageWrapper.appendChild(tileImage);

		element.appendChild(imageWrapper);

		return element;
	}

	bindButtonPush (handler) {
		this.buttonPush.addEventListener('click', e => {
			handler && handler();
		});
	}

	bindButtonPop (handler) {
		this.buttonPop.addEventListener('click', e => {
			handler && handler();
		});
	}
}

export default Home;