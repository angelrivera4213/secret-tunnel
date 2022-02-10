class EventEmitter {
    constructor () {
        this._observers = new Map();
    }

    addEventListener (type, listener) {
        const hasType = !!type;
        const isFunction = typeof listener === 'function';
        const isEventListener = typeof listener === 'object' && typeof listener.handleEvent === 'function';

        if (!hasType || (!isFunction && !isEventListener)) {
            return;
        }

        if (!this._observers.has(type)) {
            this._observers.set(type, new Set());
        }

        this._observers.get(type).add(listener);

        console.log('addEventListener.this._observers', this._observers)
    }

    removeEventListener (type, listener) {
        if (!this._observers.has(type)) {
            return;
        }

        const listeners = this._observers.get(type);

        listeners.delete(listener);

        console.log('removeEventListener.this._observers', this._observers)
    }

    emit (type, data) {
        if (!this._observers.has(type)) {
            return;
        }

        const listeners = this._observers.get(type);

        [...listeners].forEach(listener => {
            console.log('listener', listener);
            const isFunction = typeof listener === 'function';
            const isEventListener = typeof listener === 'object' && typeof listener.handleEvent === 'function';

            if (isFunction) {
                listener(data);
                return;
            }

            if (isEventListener) {
                listener.handleEvent(data);
            }
        });
    }
}

export default EventEmitter;