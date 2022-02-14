import createReducerStore from './lib/createReducerStore';

export default createReducerStore({
	storeName: 'HomeStore',
	initialState: {},
	reducers: {
		'LOAD_HOME_SUCCESS': (state, payload) => {
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