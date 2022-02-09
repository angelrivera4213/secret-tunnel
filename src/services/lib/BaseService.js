import Service from './Service';
import pick from 'lodash.pick';
import rest from './rest';
import sub from '../../lib/sub';

const RO_HOST_KEY = 'roHost';
const methodHostTypeOverride = {
	'GET': RO_HOST_KEY
};

export class BaseService extends Service {
	async crud (type, context, resource, params = {}, body) {
		let configData = this.cb;
		console.log('configData', configData);
		let resourceData = configData?.resources?.[resource];

		if (!resourceData) {
			throw new Error(`Resource ${resource} does not exist`);
		}

		const resourceConfig = Object.assign({}, configData.defaults, resourceData);
		const hostType = methodHostTypeOverride[type] || 'host';
		const url = {
			protocol: resourceConfig.protocol,
			host: resourceConfig[hostType],
			path: (resourceConfig.pathPrefix || '') + sub(resourceConfig.path, params),
			query: pick(
				Object.assign({}, params, resourceConfig.params),
				[].concat(resourceConfig.query)
			)
		};
		const headers = Object.assign({}, resourceConfig.headers);

		return await rest(url, type, headers, body, resourceConfig);
	}

	async create (context, resource, params, body) {
		return await this.crud('POST', context, resource, params, body);
	}

	async read (context, resource, params) {
		return await this.crud('GET', context, resource, params, null);
	}

	async update (context, resource, params, body) {
		return await this.crud('PUT', context, resource, params, body);
	}

	async delete (context, resource, params) {
		return await this.crud('DELETE', context, resource, params, null);
	}
}

export default BaseService;