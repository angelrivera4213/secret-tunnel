import { getTextByKey as textByKey } from './text';

export const TYPE_CURATED_SET = 'CuratedSet';
export const TYPE_SET_REF = 'SetRef';
export const TYPE_BECAUSE_YOU_SET = 'BecauseYouSet';
export const TYPE_PERSONALIZED_CURATED_SET = 'PersonalizedCuratedSet';
export const TYPE_TRENDING_SET = 'TrendingSet';

export const getContentClass = (set = {}) => set?.contentClass;
export const getItems = (set = {}) => set?.items;
export const getMeta = (set = {}) => set?.meta;
export const getText = (set = {}) => set?.text;
export const getType = (set = {}) => set?.type;
export const getSetId = (set = {}) => set?.setId;
export const getTextByKey = (text, key, format, lang) => textByKey(text, key, format, 'set', lang);
export const getRefId = (set = {}) => set?.refId;
export const getRefIdType = (set = {}) => set?.refIdType;