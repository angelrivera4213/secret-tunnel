// Home
export const getContainers = (collection = {}) => collection?.containers;
export const getCollectionId = (collection = {}) => collection?.collectionId;
export const getType = (collection = {}) => collection?.type;
export const getText = (collection = {}) => collection?.text;
export const getCollection = (obj, type) => obj?.[type];

