import render from './lib/render';
import Title from './components/Title';
import AppContext from './context/AppContext';
import MyReducerStore from './stores/MyReducerStore';
import StarwarsService from './services/StarwarsService';

// index.js is defered so no need for listener

render(Title({
	name: 'Look at console output',
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
	StarwarsService.read(context, 'starwars.characters', {}).then(result => {
		context.dispatch('LOAD_STAR_WARS_CHARACTERS', {
			characters: result
		});
		done?.(null, result)
	}).catch(err => {
		done?.(err, )
	});
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





