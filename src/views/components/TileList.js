import cx from 'classnames';
import { createElement } from '../lib/utils';

// Components
import Tile from './Tile';

export default function TileList ({
	className,
	attributes,
	style,
	tiles = []
} = {}) {
	const itemsContainer = createElement('div', {
		attributes,
		className: cx('tiles-container flex snap-x pl-12 overflow-auto', className),
		style
	});

	itemsContainer.onkeydown = (e) => {
		if (['ArrowUp', 'ArrowDown' , 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
			e.view.event.preventDefault();
		}
    };

	// create item nodes
	tiles.forEach(tile => {
		itemsContainer.appendChild(Tile({
			tile
		}));
	});

	return itemsContainer;
}