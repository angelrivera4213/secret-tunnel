import View from './lib/View';

// Components
import HomeCollection from './components/collection/HomeCollection';
import EmptyTileList from './components/EmptyTileList';
import SetComponent from './components/set';

// Utils
import throttle from '../lib/throttle';
import debounce from '../lib/debounce';
import { createElement, isInViewport, removeClassName, setAttributes } from './lib/utils';

class Home extends View {
    mount (/*props, context*/) {
        this.onArrowClick = throttle(this._onArrowClick, 200);
        this.root = createElement('div', {
            className: `
                min-h-screen max-h-screen min-w-screen max-w-screen 
                overflow-x-hidden bg-neutral-900 text-xl overflow-y-scroll pb-6
            `
        });
        this._focusedElem = null;
        this._pendingRefs = new Map();
    }

    getRoot () {
        return this.root;
    }

    unmount (/*props = {}, root, context*/) {
        // any set timeouts or set intervals

    }

    rehydrate (/*root , context*/) {

    }

    dehydrate (/*root, context*/) {

    }

    loadHome (data) {
        this._collection = HomeCollection(data);

        this.root.appendChild(this._collection);
    }

    bindScrollBottom (handler) {
        this.root.addEventListener('scroll', debounce(() => {
            const lastSetInViewPort = this.lastSetInViewPort();

            if (lastSetInViewPort) {
                handler && handler();
            }
        }, 200));
    }

    lastSetInViewPort () {
        if (this.root) {
            const visibleSets = this.root.querySelectorAll('[data-set-id], [data-ref-id][data-ref-state="loading"]');
            console.log('visibleSets', visibleSets);
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
        const existingSet = this.root.querySelector('[data-set-id]');
        const setOffsetHeight = existingSet.offsetHeight; // we want border and padding in calculation
        const setAmount = Math.ceil(viewportHeight / setOffsetHeight);

        // create placeholder sets
        const refSets = this.root.querySelectorAll('[data-ref-id-type="setId"]:not([data-ref-state="loading"])');
        const refSetsToLoad = [...refSets].slice(0, setAmount);
        const refIds = [];
		
        for (const refSet of refSetsToLoad) {
            const refId = refSet?.dataset?.refId;

            refSet?.appendChild?.(EmptyTileList());
            removeClassName(refSet, 'hidden');
            setAttributes(refSet, {
                'data-ref-state': 'loading'
            });

            this._pendingRefs.set(refId, refSet);
            refIds.push(refId);
        }

        // call handler to make call for ref sets 
        this._setRefLoadListener?.({
            refIdList: refIds
        });
    } 

    loadRefs (setsByRefId) {
        const pendingRefs = [...this._pendingRefs.entries()];
        pendingRefs.forEach(([refId, refNode]) => {
            const setData = setsByRefId[refId];

            if (setData) {
                this._pendingRefs.delete(refId);
                const parent = refNode.parentNode;
                parent?.replaceChild(SetComponent(setData), refNode);
            }
        });
    }

    _focusTile (elem) {
        elem?.focus();
        this._focusedTile = elem;
    }

    _focusContainer (elem) {
        this._focusedContainer = elem;
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
    };

    _onArrowDown () {
        let container;

        if (!this._focusedContainer) {
            // No Focused Elem exist so set the first one
            container = this.root.querySelector('[data-container-type]');
        } else {
            container = this._focusedContainer.nextElementSibling;
        }

        const set = container?.querySelector('[data-set-id]');
        const firstTile = set?.querySelector('[data-tile-content-id]');

        if (firstTile) {
            this._focusTile(firstTile);
            this._focusContainer(container);
        }
    }

    _onArrowUp () {
        if (this._focusedTile) {
            const previousContainer = this._focusedContainer.previousElementSibling;
            const set = previousContainer?.querySelector('[data-set-id]');
            const firstTile = set?.querySelector('[data-tile-content-id]');

            if (firstTile) {
                this._focusTile(firstTile);
                this._focusContainer(previousContainer);
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