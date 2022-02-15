// Components
import ShelfContainer from './ShelfContainer';

// Type
import {
    TYPE_SHELF_CONTAINER,
    getType
} from '../../../selectors/container';

const typeToComponent = {
    [TYPE_SHELF_CONTAINER]: ShelfContainer 
};

export default function Container (container, options) {
    const type = getType(container);
    const Component = typeToComponent[type] || ShelfContainer;

    return Component(container, options);
}