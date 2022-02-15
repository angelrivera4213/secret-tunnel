// Components
import StandardTile from './StandardTile';

// Type
import {
	DMC_SERIES_TYPE,
	DMC_VIDEO_TYPE,
	STANDARD_COLLECTION_TYPE,
	getType
} from '../../../selectors/content';

const typeToComponent = {
	[DMC_SERIES_TYPE]: StandardTile,
	[DMC_VIDEO_TYPE]: StandardTile,
	[STANDARD_COLLECTION_TYPE]: StandardTile
};

export default function Tile (content, options) {
	const type = getType(content);
	const Component = typeToComponent[type] || StandardTile;

	return Component(content, options);
}