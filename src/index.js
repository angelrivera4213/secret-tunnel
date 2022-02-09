import { render } from './lib/component';
import createReducerStore from './stores/lib/createReducerStore';
import Title from './components/Title';

// index.js is defered so no need for listener

render(Title({
	name: 'Secret Tunnel',
}), document.querySelector('#root'));


const MyReducerStore = createReducerStore({
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
	}
});

MyReducerStore.addListener((state) => {
	console.log('MyReducerStore emitted change', state);
});

MyReducerStore.addListener((state) => {
	console.log('Listener 2 MyReducerStore emitted change', state);
});

MyReducerStore.onDispatch('UPDATE_NAME', {
	name: 'Aang'
});

MyReducerStore.onDispatch('UPDATE_NAME', {
	name: 'Katara'
});

MyReducerStore.onDispatch('LOAD_STAR_WARS_CHARACTERS', {
	characters: ['Anakin', 'Obi-Wan', 'Palpatine']
});

MyReducerStore.onDispatch('RANDOM_EVENT', {
	sup: ['Anakin', 'Obi-Wan', 'Palpatine']
});





