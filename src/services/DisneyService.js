import BaseService from './lib/BaseService';
import config from './configs/disney.js';

export default new BaseService({
    name: 'disney',
    cb: config
});