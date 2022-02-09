class Dispatcher {
	constructor () {
		this._storesByName = new Map();
	}

	registerStore (store) {
		if (!store?.storeName) {
			throw new Error('register Stores expected Store');
		}

		if (this._storesByName.has(store?.storeName)) {
			if (this._storesByName.get(store?.storeName) === store) {
				throw new Error(`Store with name ${store?.storeName}`);
			}

			throw new Error('Store has already been registered');
		}

		this._storesByName.set(store?.storeName, store);
	}

	registerStores (stores) {
		for (const store of stores) {
			this.registerStore(store);
		}
	}

	getStore (store) {
		let storeName = store;
		if (store?.storeName) {
			storeName = store?.storeName;
		}

		const existingStore = this._storesByName.get(storeName);

		if (!existingStore) {
			throw new Error(`${storeName} has not been registered`)
		}

		return existingStore;
	}

	dispatch (...args) {
		for (const store of this._storesByName.values()) {
			store?.onDispatch(...args);
		}
	}
}

export default Dispatcher;