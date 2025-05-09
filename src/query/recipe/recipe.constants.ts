import { ResponseParams } from '../types';

export const DEFAULT_PARAMS: ResponseParams = {
    page: 1,
    limit: 8,
};

export const SLIDER_PARAMS: ResponseParams = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
};

export const ABOUT_PARAMS: ResponseParams = {
    page: 1,
    limit: 5,
};
export const POPULAR_PARAMS: ResponseParams = {
    page: 1,
    limit: 8,
    sortBy: 'likes',
    sortOrder: 'desc',
};
export const POPULAR_MAIN_PARAMS: ResponseParams = {
    page: 1,
    limit: 4,
    sortBy: 'likes',
    sortOrder: 'desc',
};

export const RECEPIES_PARAMS: ResponseParams = {
    page: 1,
    limit: 8,
    sortBy: 'createdAt',
    sortOrder: 'asc',
};
