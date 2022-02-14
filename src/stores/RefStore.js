import createReducerStore from './lib/createReducerStore';

export default createReducerStore({
	storeName: 'RefStore',
	initialState: {},
	reducers: {
		'REF_LOAD_SUCCESS': (state, payload) => {
			const data = payload?.data;
			const originalParams = payload?.originalParams;

			if (data) {
				const refId = originalParams?.refId;
				const set = data[Object.keys(data)[0]];
				return {
					...state,
					[refId]: set
				};
			}

			return state;
		}
	},
	getters: {
		getState: state => state
	}
});