/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param context component context provided by the app allows Controller to access store state, executeAction
 * @param view
 */
export class Controller {
	constructor(view, context) {
    	this._view = view
    	this._context = context;
	}

	getRoot = (...args) => this._view.getRoot(...args);

	mount = (...args) => {
		this._view.mount(...args);
		this.mounted?.();
	}

	unmount = (...args) => this._view.unmount(...args);

	rehydrate = (...args) => this._view.rehydrate(...args);

	dehydrate = (...args) => this._view.rehydrate(...args);

} 

export default Controller;