import createReducerStore from './lib/createReducerStore';

export default createReducerStore({
	storeName: 'MyReducerStore',
	initialState: {},
	reducers: {
		'UPDATE_NAME': (state, payload) => {
			return {
				...state,
				name: payload?.name
			}
		},
		'LOAD_STAR_WARS_CHARACTERS': (state, payload) => {
			return {
				...state,
				characters: payload?.characters
			};
		}
	},
	getters: {
		getState: state => state
	}
});