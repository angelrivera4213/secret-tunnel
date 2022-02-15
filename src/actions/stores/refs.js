// Services
import DisneyService from '../../services/DisneyService';

// libs
import loadAction from '../lib/loadAction';


export const getRef = loadAction(DisneyService, 'disney.ref', 'REF', {
    returnOriginalParams: true
});

export function loadRef (context, payload, done) {
    const refId = payload?.refId;

    if (!refId) {
        return done?.();
    }

    context.executeAction(getRef, { refId }, done);
}