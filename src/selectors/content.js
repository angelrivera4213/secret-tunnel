export const DMC_SERIES_TYPE = 'DmcSeries';
export const DMC_VIDEO_TYPE = 'DmcVideo';
export const STANDARD_COLLECTION_TYPE = 'StandardCollection';

export const getContentId = (content = {}) => content?.contentId;
export const getImage = (content = {}) => content?.image;
export const getText = (content = {}) => content?.text;
export const getType = (content = {}) => content?.type;

export const imageKeyByType = {
    [DMC_SERIES_TYPE]: 'series',
    [DMC_VIDEO_TYPE]: 'program',
    [STANDARD_COLLECTION_TYPE]: 'default'
};