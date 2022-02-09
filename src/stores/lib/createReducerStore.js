import ReducerStore from './ReducerStore';

/* 
    example reducer 

	export const myReducer = (state, payload) => {
		
	}
 */

/*
	reducers = {
		'LOAD_STAR_WARS_CHARACTER_SUCCESS': myReducer
	}
*/
export default function createReducerStore(config) {
	const storeName = config?.storeName;
	const initialState = config?.initialState || {};
	const reducers = config?.reducers || {};
	// Might add getters to make it simpler to retreive store data

	if (!storeName?.length) {
		throw new Error('storeName must be specified for a Store');
	}

	return new ReducerStore({
		storeName,
		initialState,
		reducers
	});
}