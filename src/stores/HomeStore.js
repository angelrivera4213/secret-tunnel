import createReducerStore from './lib/createReducerStore';

export default createReducerStore({
	storeName: 'HomeStore',
	initialState: {},
	reducers: {
		'HOME_LOAD_SUCCESS': (state, payload) => {
			const data = payload?.data;

			if (data) {
				return {
					...state,
					data: payload?.data || {}
				};
			}

			return state;
		}
	},
	getters: {
		getState: state => state
	}
});