import Controller from './lib/Controller';
import HomeView from '../views/Home';

// stores
import HomeStore from '../stores/HomeStore';

// Actions
import { loadHome } from '../actions/stores/home';

export class HomeController extends Controller {
	viewMounted () {
		const homeStore = this._context.getStore(HomeStore);
		homeStore.addListener(this._homeStoreListener);

		this._context.executeAction(loadHome, {});
	}

	viewWillUnmount () {
		const homeStore = this._context.getStore(HomeStore);
		homeStore.removeListener(this._homeStoreListener);
	}

	_homeStoreListener = () => {
		const homeStore = this._context.getStore(HomeStore);
		this._view.loadHome(homeStore.getState()?.data);
	};

	handlePush = () => {
    	console.log('doing push');

    	this._context.page.pushPage(createHomeController({
    		text: `Hello ${Math.random()}`,
    		backgroundColor: Math.floor( Math.random() * 16777215).toString(16)
    	}));
  	}

  	handlePop = () => {
  		console.log('doing pop');

  		this._context.page.popPage();
  	}
}

// will add mixins for keyboard controls

const createHomeController = (props) => ({
	context
}) => {
	const controller = new HomeController(new HomeView(), context);
	
	controller.mount(props, context);

	return controller;
};

export default createHomeController;