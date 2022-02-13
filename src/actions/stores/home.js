import DisneyService from '../../services/DisneyService';

export function loadHome (context, payload, done) {
	DisneyService.read(context, 'disney.home', {}).then(result => {
		console.log('LOAD_HOME', result)
		context.dispatch('LOAD_HOME', result);
		done?.(null, result)
	}).catch(err => {
		done?.(err)
	});
}

export function loadSetRefs (context, payload, done) {
	
}