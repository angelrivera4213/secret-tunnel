import createReducerStore from './lib/createReducerStore';

export default createReducerStore({
    storeName: 'HomeStore',
    initialState: {},
    reducers: {
        'HOME_LOAD_SUCCESS': (state, payload) => {
            const data = payload?.data;

            if (data) {
                const collection = data[Object.keys(data)[0]];
                return {
                    ...state,
                    data: collection
                };
            }

            return state;
        }
    },
    getters: {
        getState: state => state
    }
});