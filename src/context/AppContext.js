import createAppContext from './lib/createAppContext';

const appContext = createAppContext({
	componentActionErrorHandler: function componentActionErrorHandler (context, payload, done) {
		if (payload.err) {
			// Handle err codes here from service requests
			console.log('Component Error Handler', payload);
		}
	}
});

export default appContext;