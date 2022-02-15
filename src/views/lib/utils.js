export function isInViewport (node) {
    const elemRect = node?.getBoundingClientRect();
    const winWidth = window?.innerWidth;
    const winHeight = window?.innerHeight;
    const left = elemRect?.left;
    const right = elemRect?.right;
    const top = elemRect?.top;
    const bottom = elemRect?.bottom;


    return (
        (
            (left >= 0 && left <= winWidth) ||
            (right >= 0 && right <= winWidth) ||
            (left < 0 && right > winWidth)
        ) &&
        (
            (top >= 0 && top <= winHeight) ||
            (bottom >=0 && bottom <= winHeight) ||
            (top < 0 && bottom > winHeight)
        )
    );
}

export function createElement (tag, props) {
    const className = props?.className || '';
    const style = props?.style || {};
    const attributes = props?.attributes || {};

    const element = document.createElement(tag);

    addClassName(element, className);
    setAttributes(element, attributes);
    setStyle(element, style);

    return element;
}

export function addClassName (node, className) {
    const classes = className?.replace(/\s+/g, ' ')?.split?.(' ').map(c => c.trim()).filter(c => !!c);
    node?.classList?.add(...classes);
}

export function removeClassName (node, className) {
    const classes = className?.replace(/\s+/g, ' ')?.split?.(' ').map(c => c.trim()).filter(c => !!c);
    node?.classList?.remove(...classes);
}

export function setAttributes (node, attributes) {
    attributes = attributes || {};

    for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            node?.setAttribute?.(key, attributes[key]);
        }
    }
}

export function setStyle (node, style) {
    style = style || {};

    for (const key in style) {
        if (Object.prototype.hasOwnProperty.call(style, key)) {
            node.style[key] = style?.[key];
        }
    }
}





