export const TYPE_CURATED_SET = 'CuratedSet';
export const TYPE_SET_REF = 'SetRef';

export const getItems = (set = {}) => set?.items;
export const getMeta = (set = {}) => set?.meta;
export const getText = (set = {}) => set?.text;
export const setType = (set = {}) => set?.type;
export const getRefId = (set = {}) => set?.refId;
export const getSetId = (set = {}) => set?.setId;