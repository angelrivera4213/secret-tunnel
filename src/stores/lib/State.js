import EventEmitter from '../../lib/EventEmitter';

class State extends EventEmitter {
    constructor (initialState) {
        super();
        this._state = Object.assign({}, initialState);
    }

    setState (newState) {
        this._state = newState;
        this.emit('stateChange', this._state);
    }

    addListener (listener) {
        this.addEventListener('stateChange', listener);
    }

    removeListener (listener) {
        this.removeEventListener('stateChange', listener);
    }

    getState () {
        return this._state;
    }
}

export default State;