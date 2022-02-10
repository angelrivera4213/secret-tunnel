import createAppContext from './lib/createAppContext';

const appContext = createAppContext({
	componentActionErrorHandler: function componentActionErrorHandler (context, payload, done) {
		console.log('Component Action Error', payload);
	}
});

export default appContext;