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
				'ArrowUp': this._onArrowUp,
				'ArrowDown': this._onArrowDown,
				'ArrowRight': this._onArrowRight,
				'ArrowLeft': this._onArrowLeft
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

	_onArrowUp = () => {
		console.log('_onArrowUp');
		this._view.onArrowUp?.();
	}

	_onArrowDown = () => {
		console.log('_onArrowDown');
		this._view.onArrowDown?.();
	}

	_onArrowRight = () => {
		console.log('_onArrowRight');
		this._view.onArrowRight?.();
	}

	_onArrowLeft = () => {
		console.log('_onArrowLeft');
		this._view.onArrowLeft?.();
	}
}

export default HomeController;