import View from './lib/View';

// Components
import Tile from './components/Tile';
import TileList from './components/TileList';
import HomeCollection from './components/collection/HomeCollection';

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
import debounce from '../lib/debounce';
import { isInViewport } from './lib/utils';

class Home extends View {
	mount (props = {}, context) {
		const {
			backgroundColor = '000',
			className = '',
			text
		} = props;
		this.onArrowClick = throttle(this._onArrowClick, 200);
		this.root = this.createElement('div', `min-h-screen max-h-screen min-w-screen max-w-screen overflow-x-hidden bg-neutral-900 text-xl overflow-y-scroll pb-6 `);
		this._focusedElem = null;
		this._pendingRefs = new Map();
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
		this._collection = HomeCollection(data);

		this.root.appendChild(this._collection);
	}

	bindScrollBottom (handler) {
		this.root.addEventListener('scroll', debounce(e => {
			const lastSetInViewPort = this.lastSetInViewPort();

			if (lastSetInViewPort) {
				handler && handler();
			}
		}, 200));
	}

	lastSetInViewPort () {
		if (this.root) {
			const visibleSets = this.root.querySelectorAll(`div.set:not([data-ref-state=initial])`);
			const lastVisibleSet = visibleSets.item(visibleSets.length - 1);

			// if last visible set is in the view port then call handler
			const lastInViewPort = isInViewport(lastVisibleSet);

			return lastInViewPort;
		}

		return false;
	}

	setRefLoadListener (handler) {
		this._setRefLoadListener = handler;
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
		const refIds = [];
		
		for (const refSet of refSetsToLoad) {
			const refId = refSet?.dataset?.refId;

			const newRefSet = this._createPlacholderSet(refSet, {
				tiles: {
					num: numTiles
				}
			});

			this._pendingRefs.set(refId, newRefSet);
			refIds.push(refId);
		}



		// call handler to make call for ref sets 
		this._setRefLoadListener?.({
			refIdList: refIds
		});
	} 

	loadRefs (setsByRefId) {
		const pendingRefs= [...this._pendingRefs.entries()];
		pendingRefs.forEach(([refId, refNode]) => {
			const setData = setsByRefId[refId];

			if (setData) {
				const setId = getSetId(setData);
				const type = getType(setData);
				
				this._pendingRefs.delete(refId);

				refNode.setAttribute('data-set-id', setId);
				refNode.setAttribute('data-set-type', type);
				refNode.setAttribute('data-ref-state', 'complete');

				this._setRefTiles(refNode, setData);
			}
		});
	}

	_setRefTiles (node, data) {
		const items = getItems(data);

		const tileList = TileList({
			tiles: items
		});

		const origTileList = node.querySelector('.tiles-container');

		node.replaceChild(tileList, origTileList);
	}


	_createPlacholderSet (refSet, options) {
		if (!refSet) {
			return;
		}

		const numTiles = options?.tiles?.num || 0;
		const itemsContainer =refSet.querySelector('div.tiles-container');

		// create item nodes
		for (let i = 0; i < numTiles; i++) {
			const itemNode = Tile();
			itemsContainer.appendChild(itemNode);
		}

		itemsContainer.classList.add('animate-pulse');
		refSet.setAttribute('data-ref-state', 'pending');
		refSet.classList.remove('hidden');

		return refSet
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