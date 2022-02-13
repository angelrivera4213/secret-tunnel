import Controller from './lib/Controller';

// stores
import HomeStore from '../stores/HomeStore';

// Mixins
import { mix } from '../mixins/lib/MixinBuilder';
import KeyboardListenerMixin from '../mixins/KeyboardListenerMixin';

// Actions
import { loadHome, loadNextRefs } from '../actions/stores/home';

export class HomeController extends mix(Controller).with(KeyboardListenerMixin) {
	viewMounted () {
		const homeStore = this._context.getStore(HomeStore);
		homeStore.addListener(this._homeStoreListener);

		this._context.executeAction(loadHome, {});

		this._view.bindScrollBottom(this._onBottomScrollListener);

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
	}

	_onBottomScrollListener = () => {
		this._context.executeAction(loadSetRefs, {});
	}

	_onKeyDown = (...args) => {
		console.log('here', args);
		this._view.onArrowClick?.(...args)
	}
}

export default HomeController;