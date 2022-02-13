const KeyboardListenerMixin = (superclass) => class extends superclass {
    mountKeyboardListener (spec = {}) {
        if (!this._keyBoard) {
            this._keyBoard = {
                handlers: spec?.keyHandlers || {},
                keyListener: (e) => {
                    const key = e?.key;
                    const handler = this._keyBoard.handlers?.[key];
                    handler?.(key);
                }
            };

            document.addEventListener('keydown', this._keyBoard.keyListener);
        }
    }

    unmountKeyboardListener () {
        document.removeEventListener('keydown', this._keyBoard.keyListener);
    }
};

export default KeyboardListenerMixin;
