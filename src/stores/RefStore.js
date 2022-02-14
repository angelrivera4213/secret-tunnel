import createReducerStore from './lib/createReducerStore';

import {
	getSetId
} from '../selectors/set';

export default createReducerStore({
	storeName: 'RefStore',
	initialState: {},
	reducers: {
		'LOAD_REF_SUCCESS': (state, payload) => {
			const data = payload?.data;

			if (data) {
				const set = data[Object.keys(data)[0]];
				const setId = getSetId(set);
				return {
					...state,
					[setId]: set
				};
			}

			return state;
		}
	},
	getters: {
		getState: state => state
	}
});