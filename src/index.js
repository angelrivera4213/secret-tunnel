import render from './lib/render';
import Title from './components/Title';
import AppContext from './context/AppContext';
import MyReducerStore from './stores/MyReducerStore';

// index.js is defered so no need for listener

render(Title({
	name: 'Secret Tunnel',
}), document.querySelector('#root'));


const appContext = new AppContext({
	componentActionErrorHandler: function componentActionErrorHandler (context, payload, done) {
		console.log('Component Action Error', payload);
	}
});

appContext.registerStores([
	MyReducerStore
]);

const componentContext = appContext.getComponentContext();

const store = componentContext.getStore(MyReducerStore);

store.addListener((state) => {
	console.log('MyReducerStore update', state);
});

function loadCharacters (context, payload, done) {
	context.dispatch('LOAD_STAR_WARS_CHARACTERS', {
		characters: ['ANAKIN', 'OBI_WAN', 'PALPATINE']
	});

	done?.()
}

function updateNameAction (context, payload, done) {
	console.log('action context', context);
	context.dispatch('UPDATE_NAME', {
		name: payload?.name
	});

	context.executeAction(loadCharacters, {}, done);
}

componentContext.executeAction(updateNameAction, {
	name: 'ANGEL'
});




