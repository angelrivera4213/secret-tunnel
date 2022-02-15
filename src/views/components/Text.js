import { createElement } from '../lib/utils';

export default function Text ({
    className,
    attributes,
    style,
    text
} = {}) {
    const element = createElement('span', {
        className,
        attributes,
        style
    });

    element.innerText = text;

    return element;
}