export const getTextByKey = (text, key, format, type, lang = 'default') =>
    text?.[key]?.[format]?.[type]?.[lang];
export const getTextContent = (obj = {}) => obj?.content;
export const getTextLang = (obj = {}) => obj?.lang;


