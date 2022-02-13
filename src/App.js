class App {
	constructor({
		context,
		rootSelector = '#root'
	}) {
		this._context = context;
		this._controllerStack = [];

		this._root = document.querySelector(rootSelector);
	}

	_getAppContext () {
		if (!this._appContext) {
			// TODO: Create Page/Layout Components and create a PageStack class
			// Could register Layout Comonents and have a config containing the layout type
			// and the associated controllers in the layout. 
			// Controllers would need to be registered as well
			// Layouts could then be rendered as Pages and stored on a PageStack or PageCache
			
			this._appContext = {
				page: {
					pushPage: (...args) => this.pushController(...args),
					popPage: (...args) => this.popController(...args),
				},
				...this._context
			}
		}

		return this._appContext;
	}


	getCurrentController () {
		const _controllerStack = this._controllerStack;
		const length = _controllerStack.length;
		return _controllerStack[length - 1];
	}

	pushController (createController) {
		// should remove current controller from the dom but
		// keep reference in the controller stack 
		const controller = createController({
			context: this._getAppContext()
		});

		const currentController = this.getCurrentController();
		
		if (currentController) {
			const currCntlRoot = currentController.getRoot();
			currCntlRoot.viewWillUnmount?.();
			this._root.removeChild(currCntlRoot);
			currentController.dehydrate(this._getAppContext());
		}

		this._root.appendChild(controller.getRoot());
		controller.viewMounted?.();
		this._controllerStack.push(controller);
	}

	popController () {
		if (this._controllerStack.length > 1) {
			const currentController = this._controllerStack.pop();
			this._root.removeChild(currentController.getRoot());
			currentController.viewWillUnmount?.();
			currentController.unmount(this._getAppContext());

			const newController = this.getCurrentController();
			newController.rehydrate(this._getAppContext());
			this._root.appendChild(newController.getRoot());
			controller.viewMounted?.();
		}
	}
}

export default App;