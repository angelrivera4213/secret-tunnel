// Components
import RefSet from './RefSet';
import StandardSet from './StandardSet';

// Type
import {
    TYPE_CURATED_SET,
    TYPE_SET_REF,
    TYPE_BECAUSE_YOU_SET,
    TYPE_PERSONALIZED_CURATED_SET,
    TYPE_TRENDING_SET,
    getType,
    getContentClass
} from '../../../selectors/set';

const typeToComponent = {
    [TYPE_CURATED_SET]: StandardSet,
    [TYPE_BECAUSE_YOU_SET]: StandardSet,
    [TYPE_PERSONALIZED_CURATED_SET]: StandardSet,
    [TYPE_TRENDING_SET]: StandardSet,
    [TYPE_SET_REF]: RefSet,
};

export default function Set (set, options) {
    const type = getType(set);
    const Component = typeToComponent[type] || StandardSet;

    return Component(set, options);
}