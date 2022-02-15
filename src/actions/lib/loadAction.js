const LOAD_ATTEMPT = 'LOAD_ATTEMPT';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';


// TODO: Move services into app context 
// this way we can access service by name instead of having to pass it in directly

export default (service, resource, namespace, options) =>  {
    const returnOriginalParams = options?.returnOriginalParams;

    return (context, payload, done) => {
        payload = payload || {};

        context.dispatch(`${namespace}_${LOAD_ATTEMPT}`);

        if (typeof service?.read === 'function') {
            return service.read(context, resource, payload).then(result => {

                if (returnOriginalParams && result) {
                    result.originalParams = { ...payload };
                }

                context.dispatch(`${namespace}_${LOAD_SUCCESS}`, result);

                done?.(null, result);
            }).catch(err => {
                context.dispatch(`${namespace}_${LOAD_FAILURE}`, err);
                done?.(err);
            });
        }

        done?.(new Error('loadAction: Service expected to have CRUD implemented'));
    };
};