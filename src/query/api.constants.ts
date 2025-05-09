// import axios from 'axios';

import { ResponseParams } from './types';

export const BASE_IMAGE_URL = 'https://training-api.clevertec.ru';
export const getImagePath = (url: string) => `${BASE_IMAGE_URL}${url}`;

export const BASE_URL = 'https://marathon-api.clevertec.ru';

// export const axiosInstance = axios.create({
//     baseURL: BASE_URL,
// });

export const DEFAULT_PARAMS: ResponseParams = {
    page: 1,
    limit: 8,
    // sortBy: 'likes',
    // sortOrder: 'desc',
};
