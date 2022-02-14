import Controller from './lib/Controller';

// stores
import HomeStore from '../stores/HomeStore';
import RefStore from '../stores/RefStore';

// Mixins
import { mix } from '../mixins/lib/MixinBuilder';
import KeyboardListenerMixin from '../mixins/KeyboardListenerMixin';

// Actions
import { loadHome, loadRefs } from '../actions/stores/home';

export class HomeController extends mix(Controller).with(KeyboardListenerMixin) {
	viewMounted () {
		const homeStore = this._context.getStore(HomeStore);
		homeStore.addListener(this._homeStoreListener);

		const refStore = this._context.getStore(RefStore);
		refStore.addListener(this._refStoreListener);

		this._context.executeAction(loadHome, {});

		this._view.bindScrollBottom(this._onBottomScrollLoad);
		this._view.setRefLoadListener(this._loadRefs)

		this.mountKeyboardListener({
			keyHandlers: {
				'ArrowUp': this._onKeyDown,
				'ArrowDown': this._onKeyDown,
				'ArrowRight': this._onKeyDown,
				'ArrowLeft': this._onKeyDown
			}
		});
	}

	viewWillUnmount () {
		const homeStore = this._context.getStore(HomeStore);
		homeStore.removeListener(this._homeStoreListener);
		this.unmountKeyboardListener();
	}

	_homeStoreListener = () => {
		const homeStore = this._context.getStore(HomeStore);
		this._view.loadHome(homeStore.getState()?.data);

		if (this._view.lastSetInViewPort()) {
			// Load more refs if current 
			// viewport already contains all available sets
			console.log('load more refs');
			this._view.setupRefPlaceholders();
		}
	}

	_refStoreListener = () => {
		const refStore = this._context.getStore(RefStore);
		this._view.loadRefs(refStore.getState());
	}

	_onBottomScrollLoad = () => {
		this._view.setupRefPlaceholders();
	}

	_loadRefs = ({ refIdList = [] }) => {
		this._context.executeAction(loadRefs, {
			refIdList
		});
	}

	_onKeyDown = (...args) => {
		this._view.onArrowClick?.(...args)
	}
}

export default HomeController;