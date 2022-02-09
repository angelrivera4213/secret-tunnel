import BaseService from './lib/BaseService';
import config from './configs/starwars.js';

export default new BaseService({
	name: 'starwars',
	cb: config
});