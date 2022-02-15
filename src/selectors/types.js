export const STANDARD_COLLECTION_TYPE = 'StandardCollection';
export const DMC_SERIES_TYPE = 'DmcSeries';
export const DMC_VIDEO_TYPE = 'DmcVideo';
export const SET_REF_TYPE = 'SetRef';
export const CURATED_SET_TYPE= 'CuratedSet';

export const getType = (obj = {}) => obj?.type;