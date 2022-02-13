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
    }

    rehydrate (context) {
        // will be called when are poppping off the stack
        // and making this the current view
        
        // handle adding listeners 
    }

    unmount (context) {
        // will be called when are poppping off the stack
        // and need to kill all references
        throw Error('Should be implemented by View Sub Class');
    }

    createElement(tag, className) {
        const element = document.createElement(tag);


        if (className) {
            const classes = className.split(' ').map(c => c.trim()).filter(c => !!c);
            element.classList.add(...classes);
        }

        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }
}

export default View;