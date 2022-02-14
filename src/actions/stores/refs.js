// Services
import DisneyService from '../../services/DisneyService';

export function loadRef (context, payload, done) {
	const refId = payload?.refId;

	if (!refId) {
		return done?.();
	}

	context.dispatch('LOAD_REF_ATTEMPT');
	
	DisneyService.read(context, 'disney.ref', { refId }).then(result => {
		context.dispatch('LOAD_REF_SUCCESS', result);
		done?.(null, result)
	}).catch(err => {
		context.dispatch('LOAD_REF_FAILURE', err);
		done?.()
	});
}