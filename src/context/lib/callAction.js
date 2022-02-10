// polyfill that will be used since IE is the only one that supports it natively
// we will be using this to add actions to the queue 
// the tasks should not block IO or rendering tasks 
// setTimeout is not a good solution is it is clamped for calls nested over 5 times
// This polyfill is recommended by MDN
import 'setimmediate';

import { isPromise } from '../../lib/utils';

export default function (actionContext, action, payload, done) {
	const executeAction = new Promise(function (resolve, reject) {
		setImmediate(() => {
			try {
				action(
					actionContext,
					payload,
					(err, result) => {
						if (err) {
							reject(err)
						} else {
							resolve(result);
						}
					}
				);
			} catch (e) {
				reject(e)
			}
		}, 0);
	}).then(result => {
		setImmediate(() => {
			done?.(null, result);
		}, 0);
	}).catch(e => {
		setImmediate(() => {
			done?.(e);
		}, 0);
	});

	return executeAction
}