import cx from 'classnames';
import { createElement } from '../../lib/utils';

// Selectors
import { getContainers, getCollectionId, getCollectionGroup } from '../../../selectors/collection';
import { getCollectionGroupId } from '../../../selectors/collectionGroup';
// Components
import Container from '../container';

export default function HomeCollection (collection, {
    className,
    attributes,
    style
} = {}) {
    const collectionId = getCollectionId(collection);
    const collectionGroup = getCollectionGroup(collection);
    const containers = getContainers(collection) || [];
    const collectionGroupId = getCollectionGroupId(collectionGroup);
	
    const element = createElement('div', {
        className: cx(className),
        attributes: {
            ...attributes,
            'data-collection-id': collectionId,
            'data-collection-group-id': collectionGroupId
        },
        style
    });

    // Create Children Set
    containers.forEach(container => {
        const containerNode = Container(container);

        element.appendChild(containerNode);
    });

    return element;
}
