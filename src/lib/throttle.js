export default function throttle (func, wait = 0, options = {}) {
    const { trailing = false } = options;
    let shouldWait = false;
    let trailed = false;

    if (typeof func !== 'function') {
        throw new Error('throttle.arguments[0] requires typeof function')
    }

    return (...args) => { // spread allows multiple values in an array
        if (trailing) {
            shouldWait = true;

            setTimeout(() => {
                shouldWait = false;
                trailed = true;
            }, wait);
        }

        if (!shouldWait) {
            // call the function
            func(...args);

            // Set should wait to true
            shouldWait = true;

            //  set a timeout to set should wait back to false
            setTimeout(() => {
                shouldWait = false;
            }, wait);
        }
    }
}
