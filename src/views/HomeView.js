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

import {
	getElemWidthRem
} from '../lib/utils';

class Home extends View {
	mount (props = {}, context) {
		const {
			backgroundColor = '000',
			className = '',
			text
		} = props;
		this.root = this.createElement('div', `min-h-screen max-h-screen bg-neutral-900 text-xl overflow-y-scroll`);
		this._focusedElem = null;
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

		const titleWrapper = this.createElement('div', 'pb-3 pl-12');
		const titleElem = this.createElement('span', 'pl-3 text-slate-50');
		titleWrapper.appendChild(titleElem);
		titleElem.innerText = titleContent;
		element.appendChild(titleWrapper);
		
		const itemsContainer = this.createElement('div', 'tiles-container flex snap-x overflow-auto pl-12');

		if (items?.length > 0) {
			// create item nodes
			for (const item of items) {
				const itemNode = this._createTileNode(item);
				itemsContainer.appendChild(itemNode);
			}

			element.appendChild(itemsContainer);

			return element;
		}

		const emptyRefSetElem = this.createElement('div', 'empty-ref-set');
		emptyRefSetElem.setAttribute('data-set-id', setId);

		return emptyRefSetElem;
	}

	_createTileNode (video) {
		const element = this.createElement('button', 'tile group snap-center p-3 outline-0');

		const contentId = getContentId(video) || getCollectionId(video);

		const image = getImageByKeyVersion(
			getImage(video),
			'tile',
			imageKeyByType[getType(video)],
			'1.78'
		);

		const imageUrl = getUrl(image);
		const text = getVideoText(video);
		const title = getTextByKey(text, 'title');
		const titleContent = getTextContent(title) || '';

		element.setAttribute('data-tile-content-id', contentId);

		const imageWrapper = this.createElement(
			'div',
			`
			 relative tile-img-wrapper  min-h-full rounded-md 
			 w-64 md:w-80 lg:w-96 bg-gradient-to-r from-zinc-600 to-zinc-700
			`
		);

		const hiddenImage = this.createElement('img', 'invisible');
		imageWrapper.appendChild(hiddenImage)

		
		const tileImageContainer = this.createElement(
			'div',
			`absolute inset-0 rounded-md h-full w-full group-focus:scale-105 group-hover:scale-105
			 transition-[transform] duration-700 bg-gradient-to-r from-zinc-600 to-zinc-700
			 after:content-[''] after:absolute after:z-10 after:bg-transparent after:border-0 after:border-slate-50 after:opacity-0
			 after:transition-opacity after:duration-700
			 after:box-border after:rounded-md after:w-full after:h-full
			 after:group-focus:border-4 after:group-hover:border-4
			 after:group-focus:opacity-80 after:group-hover:opacity-80
			 after:inset-0
			`
		);
		const tileImage = this.createElement('img', 'rounded-md');
		
		if (imageUrl) {
			tileImage.src = imageUrl;
			hiddenImage.src = imageUrl;
		}
		tileImage.alt = titleContent;

		tileImageContainer.appendChild(tileImage);


		imageWrapper.appendChild(tileImageContainer);

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

	bindScrollBottom (handler) {
		this.root.addEventListener('scroll', e => {
			const target = e.target;
			if(target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
				handler && handler();
			}
		});
	}

	_focusTile (elem) {
		elem?.scrollIntoView({behavior: 'smooth', inline: 'start'});
		elem?.focus();
		this._focusedTile = elem;
	}

	_focusSet (elem) {
		this._focusedSet = elem;
	}

	onArrowDown () {
		let set;
		let tile;
		if (!this._focusedTile) {
			// No Focused Elem exist so set the first one
			const firstSet = this.root.querySelector('.collection .set');
			const firstTile = firstSet?.querySelector('.tile');

			set = firstSet;
			tile = firstTile;
		} else {
			const nextSet = this._focusedSet.nextElementSibling;
			const firstTile = nextSet?.querySelector('.tile');

			set = nextSet;
			tile = firstTile;
		}

		if (set && tile) {
			this._focusTile(tile);
			this._focusSet(set);
		}
	}

	onArrowUp () {
		if (this._focusedTile) {
			const previousSet = this._focusedSet.previousElementSibling;
			const firstTile = previousSet?.querySelector('.tile');

			if (previousSet && firstTile) {
				this._focusTile(firstTile);
				this._focusSet(previousSet);
			}
		}
	}

	onArrowRight () {
		if (this._focusedTile) {
			const nextTile = this._focusedTile.nextElementSibling;

			if (nextTile) {
				this._focusTile(nextTile);
			}
		}
	}

	onArrowLeft () {
		if (this._focusedTile) {
			const prevTile = this._focusedTile.previousElementSibling;

			if (prevTile) {
				this._focusTile(prevTile);
			}
		}
	}
}

export default Home;