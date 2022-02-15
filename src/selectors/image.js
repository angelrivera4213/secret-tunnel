export const getImageByKeyVersion = (obj, key, type, version) =>
    obj?.[key]?.[version]?.[type]?.default;

export const getUrl = image => image?.url;