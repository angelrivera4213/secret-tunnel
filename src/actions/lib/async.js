import auto from 'run-auto';

export const createAsyncTask = (action, context, payload) => (done) => {
	context.executeAction(action, payload, done);
}

export const runParallel = (context, actions = {}, done) => {
	const tasks = Object.keys(actions).reduce((acc, taskName) => {
		const task = actions[taskName];

		const action = task?.action;
		const payload = task?.payload;

		acc[taskName] = createAsyncTask(action, context, payload);

		return acc;
	}, {});

	auto(tasks, (err, results) => {
		done?.(err, results);
	});
}