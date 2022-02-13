import View from './lib/View';

// Selectors
import { getContainers, getCollectionId, getCollection } from '../selectors/collection';
import { getSet, getType, TYPE_SHELF_CONTAINER } from '../selectors/container';
import { getText, getItems, getSetId, getRefId } from '../selectors/set';
import { getTextContent, getTextByKey } from '../selectors/text';
import { getContentId, getImage, getVideoText, imageKeyByType } from '../selectors/video';
import { getImageByKeyVersion, getUrl } from '../selectors/image';
import { STANDARD_COLLECTION_TYPE, SET_REF_TYPE, CURATED_SET_TYPE} from '../selectors/types';

// Utils
import throttle from '../lib/throttle';

class Home extends View {
	mount (props = {}, context) {
		const {
			backgroundColor = '000',
			className = '',
			text
		} = props;
		this.onArrowClick = throttle(this._onArrowClick, 200);
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
		// Get Data
		const type = getType(set);
		const text = getText(set);
		const title = getTextByKey(text, 'title');
		const titleContent = getTextContent(title) || '';

		const setNode = this.createElement('div', 'set py-6');
		const setId = getSetId(set);
		const items = getItems(set) || [];

		const titleWrapper = this.createElement('div', 'pb-3 pl-12');
		const titleElem = this.createElement('span', 'pl-3 text-slate-50');
		titleWrapper.appendChild(titleElem);
		titleElem.innerText = titleContent;
		setNode.appendChild(titleWrapper);
		
		const itemsContainer = this.createElement('div', 'tiles-container flex snap-x overflow-auto pl-12');

		itemsContainer.onkeydown = (e) => {
			if (['ArrowUp', 'ArrowDown' , 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
				e.view.event.preventDefault();
			}
	    };

		// create item nodes
		for (const item of items) {
			const itemNode = this._createTileNode(item);
			itemsContainer.appendChild(itemNode);
		}

		setNode.appendChild(itemsContainer);


		if (type === CURATED_SET_TYPE) {
			setNode.setAttribute('data-set-type', type);
			setNode.setAttribute('data-set-id', setId);
		}

		if (type === SET_REF_TYPE) {
			const refId = getRefId(set);

			setNode.classList.add('hidden')
			setNode.setAttribute('data-set-type', type);
			setNode.setAttribute('data-ref-id', refId);
			setNode.setAttribute('data-ref-state', 'initial');
		}

		return setNode
	}

	_createTileNode (video) {
		const element = this.createElement('button', 'tile group snap-center p-[1.25vw] md:p-[1vw] lg:p-[0.75vw] focus:outline-none');
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
			 bg-gradient-to-r from-zinc-600 to-zinc-700 
			 w-[50vw] md:w-[25vw] lg:w-[20vw]
			 h-[30vw] md:h-[15vw] lg:h-[12vw]
			`
		);

		const hiddenImage = this._createImageNode({
			className: 'invisible rounded-md h-full w-full fill',
			src: imageUrl,
			alt: titleContent
		});
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
		const tileImage = this._createImageNode({
			className: 'rounded-md h-full w-full fill',
			src: imageUrl,
			alt: titleContent
		});

		tileImageContainer.appendChild(tileImage);

		imageWrapper.appendChild(tileImageContainer);

		element.appendChild(imageWrapper);

		return element;
	}

	_createImageNode ({
		className = '',
		alt,
		src
	}) {
		const imageNode = this.createElement('img', className);
		imageNode.src = src;

		if (alt) {
			tileImage.alt = alt;
		}

		imageNode.onerror = () => {
			imageNode?.parentNode?.removeChild?.(imageNode);
		}

		return imageNode;
	}

	bindScrollBottom (handler) {
		this.root.addEventListener('scroll', e => {
			const target = e.target;
			if(target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
				handler && handler();
			}
		});
	}

	setupRefPlaceholders () {
		// calculate the number of sets to fill viewport
		const viewportHeight = window.innerHeight;
		const set = this.root.querySelector(`div[data-set-type='${CURATED_SET_TYPE}']`);
		const setOffsetHeight = set.offsetHeight; // we want border and padding in calculation

		const setAmount = Math.ceil(viewportHeight / setOffsetHeight);

		// calculate number of placeholder tiles
		const tiles = set.querySelectorAll('.tiles-container > .tile');
		const numTiles = tiles?.length;

		// create placeholder sets
		const refSets = this.root.querySelectorAll(`div[data-set-type='${SET_REF_TYPE}'][data-ref-state=initial]`);
		const refSetsToLoad = [...refSets].slice(0, setAmount);

		for (const refSet of refSetsToLoad) {
			this._createPlacholderSet(refSet, {
				tiles: {
					num: numTiles
				}
			});
		}


		// call handler to make call for ref sets 

	} 

	_createPlacholderSet (refSet, options) {
		if (!refSet) {
			return;
		}

		const numTiles = options?.tiles?.num || 0;
		const itemsContainer =refSet.querySelector('div.tiles-container');

		// create item nodes
		for (let i = 0; i < numTiles; i++) {
			const itemNode = this._createTileNode();
			itemsContainer.appendChild(itemNode);
		}

		itemsContainer.classList.add('animate-pulse');
		refSet.setAttribute('data-ref-state', 'pending');
		refSet.classList.remove('hidden');
	}

	_focusTile (elem) {
		elem?.focus();
		this._focusedTile = elem;
	}

	_focusSet (elem) {
		this._focusedSet = elem;
	}

	_onArrowClick = (key) => {
		switch (key) {
			case 'ArrowUp': 
				this._onArrowUp();
				break;
			case 'ArrowDown': 
				this._onArrowDown();
				break;
			case 'ArrowRight':
				this._onArrowRight();
				break;
			case 'ArrowLeft':
				this._onArrowLeft();
				break;
			default:
				break;
		}
	}

	_onArrowDown () {
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

		const isRefSet = set?.dataset?.setType === SET_REF_TYPE;
		const refState = set?.dataset?.refState;
		console.log('set?.dataset?', set?.dataset);
		const isReady = refState !== 'initial' && refState !== 'pending';

		if (isReady && set && tile) {
			this._focusTile(tile);
			this._focusSet(set);
		}
	}

	_onArrowUp () {
		if (this._focusedTile) {
			const previousSet = this._focusedSet.previousElementSibling;
			const firstTile = previousSet?.querySelector('.tile');

			if (previousSet && firstTile) {
				this._focusTile(firstTile);
				this._focusSet(previousSet);
			}
		}
	}

	_onArrowRight () {
		if (this._focusedTile) {
			const nextTile = this._focusedTile.nextElementSibling;

			if (nextTile) {
				this._focusTile(nextTile);
			}
		}
	}

	_onArrowLeft () {
		if (this._focusedTile) {
			const prevTile = this._focusedTile.previousElementSibling;

			if (prevTile) {
				this._focusTile(prevTile);
			}
		}
	}
}

export default Home;