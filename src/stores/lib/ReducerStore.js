import State from './State';

class ReducerStore extends State {
	constructor ({
		storeName,
		initialState,
		reducers
	}) {
		super(initialState);

		this._storeName = storeName;
		this._reducers = reducers;
	}


	onDispatch (eventName, payload) {
		const reducer = this._reducers?.[eventName];

		if (typeof reducer !== 'function') {
			return;
		}

		const newState = reducer(this._state, payload);

		if (newState !== this._state) {
			this.setState(newState);
		}
	}

	get storeName () {
		return this._storeName;
	}
}

export default ReducerStore;


