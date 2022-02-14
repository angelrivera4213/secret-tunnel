export default function debounce (func, wait = 0, options = {}) {
    const { leading = false } = options
    let timeoutId;
    let firstCall = false;

    if (typeof func !== 'function') {
        throw new Error('throttle.arguments[0] requires typeof function')
    }

    return (...args) => { // spread allows multiple values in an array
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (leading && !firstCall) {
            func(...args);
            firstCall = true
        }

        timeoutId = setTimeout(() => {
            func(...args);
            firstCall = false;
        }, wait);
    }
}