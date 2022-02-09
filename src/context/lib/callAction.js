import { isPromise } from '../../lib/utils';
export default function (actionContext, action, payload, done) {
	const executeAction = new Promise(function (resolve, reject) {
		setTimeout(() => {
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
		setTimeout(() => {
			done?.(null, result);
		}, 0);
	}).catch(e => {
		setTimeout(() => {
			done?.(e);
		}, 0);
	});

	return executeAction
}