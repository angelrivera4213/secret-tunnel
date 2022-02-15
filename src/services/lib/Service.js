export class Service {
    constructor (config) {
        this.cb = this._createCb(config);
        this.name = config?.name;
    }

    _createCb (config) {
        const name = this.name;
        let cb = config?.cb;
		
        if (!cb) {
            throw new Error(`An invalid config was passed in for service ${name}`);
        }

        return cb;
    }

    create () {
        throw new Error('create() not implemented');
    }

    read () {
        throw new Error('read() not implemented');
    }

    update () {
        throw new Error('update() not implemented');
    }

    delete () {
        throw new Error('delete() not implemented');
    }
}

export default Service;