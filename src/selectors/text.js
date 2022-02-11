export const getTextByKey = (obj, key, type = 'full', lang = 'default') =>
	obj?.[key]?.[type]?.set?.[lang] || obj?.[key]?.[type]?.set?.default;

export const getTextContent = (obj = {}) => obj?.content;
export const getTextLang = (obj = {}) => obj?.lang;


