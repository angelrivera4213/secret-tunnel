import 'setimmediate';
import Dispatcher from './lib/Dispatcher';
import callAction from './lib/callAction';

export default class AppContext {
	constructor ({
		componentActionErrorHandler
	}) {
		this._dispatcher = new Dispatcher();
		this._componentActionErrorHandler = componentActionErrorHandler;
	}

	registerStore (store) {
		this._registerStores.registerStore(...args);
	}

	registerStores (...args) {
		this._dispatcher.registerStores(...args);
	}

	executeAction (action, payload, done) {
		return callAction(this.getActionContext(), action, payload, done);
	}

	getActionContext () {
		if (!this._actionContext) {
			this._actionContext = {
				dispatch: (eventName, payload) => this._dispatcher.dispatch(eventName, payload),
				executeAction: (action, payload, done) => this.executeAction(action, payload, done),
				getStore: (store) => this._dispatcher.getStore(store)
			};
		}

		return this._actionContext;
	}

	getComponentContext () {
		if (!this._componentContext) {
			this._componentContext = {
				executeAction: (action, payload) => {
					this.executeAction(action, payload, err => {
						if (err) {
							this.executeAction(this._componentActionErrorHandler, {
								actionName: action?.displayName || action?.name,
								err
							}, function unhandledError (e) {
								setImmediate(() => {
									throw e;
								});
							})
						}
					})
				},
				getStore: (store) => this._dispatcher.getStore(store)
			};
		}

		return this._componentContext;
	}
}