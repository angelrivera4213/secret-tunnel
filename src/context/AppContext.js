import createAppContext from './lib/createAppContext';

const appContext = createAppContext({
    componentActionErrorHandler: function componentActionErrorHandler (context, payload) {
        if (payload?.err) {
            // Handle err codes here from service requests
            console.error('Component Error Handler', payload);
        }
    }
});

export default appContext;