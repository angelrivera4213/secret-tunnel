/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    getRoot () {
        throw Error('Should be implemented by View Sub Class');
    }
    
    mount (props = {}, root, context) {
        throw Error('Should be implemented by View Sub Class');
    }

    dehydrate (context) {
        // will be called when we are moving class to the stack
        // and is no longer the current view
        
        // might remove listeners temporarily here
        
        throw Error('Should be implemented by View Sub Class');
    }

    rehydrate (context) {
        // will be called when are poppping off the stack
        // and making this the current view
        
        // handle adding listeners 
        throw Error('Should be implemented by View Sub Class');
    }

    unmount (context) {
        // will be called when are poppping off the stack
        // and need to kill all references
        throw Error('Should be implemented by View Sub Class');
    }

    createElement(tag, className) {
        const element = document.createElement(tag);

        if (className) element.classList.add(...className.split(' '));

        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }
}

export default View;