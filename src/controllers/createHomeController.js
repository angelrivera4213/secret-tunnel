import Controller from './lib/Controller';
import HomeView from '../views/Home';

export class HomeController extends Controller {
	mounted () {
		this._view.bindButtonPush(this.handlePush);
		this._view.bindButtonPop(this.handlePop);
	}

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