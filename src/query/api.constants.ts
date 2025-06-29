export const BASE_IMAGE_URL = 'https://training-api.clevertec.ru';
export const getImagePath = (url: string | undefined) =>
    url ? `${BASE_IMAGE_URL}${url}` : undefined;

export const BASE_URL = 'https://marathon-api.clevertec.ru';
