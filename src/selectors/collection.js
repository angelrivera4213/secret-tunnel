import { getTextByKey as textByKey } from './text';

// Home
export const STANDARD_COLLECTION_TYPE = 'StandardCollection';

export const getContainers = (collection = {}) => collection?.containers;
export const getCollectionId = (collection = {}) => collection?.collectionId;
export const getCollectionGroup = (collection = {}) => collection?.collectionGroup;
export const getType = (collection = {}) => collection?.type;
export const getText = (collection = {}) => collection?.text;
export const getTextByKey = (text, key, format, lang) => textByKey(text, key, format, 'collection', lang);

