// Services
import DisneyService from '../../services/DisneyService';

// libs
import { runParallel } from '../lib/async';

// Actions
import { loadRef } from './refs';

export function loadHome (context, payload, done) {
	context.dispatch('LOAD_HOME_ATTEMPT');

	DisneyService.read(context, 'disney.home', {}).then(result => {
		context.dispatch('LOAD_HOME_SUCCESS', result);
		done?.(null, result)
	}).catch(err => {
		context.dispatch('LOAD_HOME_FAILURE', err);
		done?.(err)
	});
}

export function loadRefs (context, payload, done) {
	const refIdList = payload?.refIdList;

	if (refIdList?.length > 0) {
		const actions = refIdList.reduce((acc, refId) => {
			acc[refId] = {
				action: loadRef,
				payload: {
					refId
				}
			};

			return acc;
		}, {});

		runParallel(context, actions, done)
	}

	done?.();
}

