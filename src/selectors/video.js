import {
	DMC_SERIES_TYPE,
	DMC_VIDEO_TYPE,
	STANDARD_COLLECTION_TYPE
} from './types';

export const getContentId = (video = {}) => video?.contentId;
export const getImage = (video = {}) => video?.image;
export const getVideoText = (video = {}) => video?.text;

export const imageKeyByType = {
	[DMC_SERIES_TYPE]: 'series',
	[DMC_VIDEO_TYPE]: 'program',
	[STANDARD_COLLECTION_TYPE]: 'default'
}