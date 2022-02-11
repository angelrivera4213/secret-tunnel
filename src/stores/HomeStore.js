import createReducerStore from './lib/createReducerStore';

export default createReducerStore({
	storeName: 'HomeStore',
	initialState: {},
	reducers: {
		'LOAD_HOME': (state, payload) => {
			return {
				...state,
				data: payload?.data || {}
			};
		}
	},
	getters: {
		getState: state => state
	}
});