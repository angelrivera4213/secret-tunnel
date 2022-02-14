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
    )
}