import cx from 'classnames';
import { createElement } from '../lib/utils';

// Components
import Tile from './tile';

export default function EmptyTileList ({
    className,
    attributes,
    style
} = {}) {
    const itemsContainer = createElement('div', {
        attributes,
        className:
		cx(
		    `
			animate-pulse rounded-md
			mx-12 p-[1.25vw] md:p-[1vw] lg:p-[0.75vw]
			h-[30vw] md:h-[15vw] lg:h-[12vw]
			bg-gradient-to-r from-zinc-600 to-zinc-700
			`,
		    className
		),
        style
    });

    return itemsContainer;
}