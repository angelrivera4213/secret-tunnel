// import so bundler picks it up
import './styles/global.css';
import App from './App';
import AppContext from './context/AppContext';
import MyReducerStore from './stores/MyReducerStore';
import createHomeController from './controllers/createHomeController';

AppContext.registerStores([
	MyReducerStore
]);
const componentContext = AppContext.getComponentContext();

const app = new App({
	context: componentContext
});

app.pushController(createHomeController());


// // index.js is defered so no need for listener
// function loadCharacters (context, payload, done) {
// 	StarwarsService.read(context, 'starwars.characters', {}).then(result => {
// 		context.dispatch('LOAD_STAR_WARS_CHARACTERS', {
// 			characters: result
// 		});
// 		done?.(null, result)
// 	}).catch(err => {
// 		done?.(err, )
// 	});
// }

// function updateNameAction (context, payload, done) {
// 	console.log('action context', context);
// 	context.dispatch('UPDATE_NAME', {
// 		name: payload?.name
// 	});

// 	context.executeAction(loadCharacters, {}, done);
// }

// componentContext.executeAction(updateNameAction, {
// 	name: 'ANGEL'
// });








