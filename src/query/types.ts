import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type MetaType = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
export interface ItemResponse<T> {
    data: T;
    meta: MetaType;
}
// const transformResponseItems = (response, error, options) => {
//     // if (options.includeCount === 0) {
//         return response.data;
// };
// export default transformResponseItems;

export interface ResponseParams {
    page?: number;
    limit: number;
    sortBy?: string;
    // sortBy?: keyof recipe;
    // sortBy?: 'createdAt' | 'likes';
    sortOrder?: 'asc' | 'desc';
    allergens?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    searchString?: string;
}
export type ResponseParamsOrNull = ResponseParams | null | undefined | void;
export type ResponseParamsWithId = {
    id: string;
} & ResponseParams;
export type ResponseParamsWithOptionalId = {
    id?: string;
} & ResponseParams;
// export type ResponseParamsOptional = Partial<ResponseParams> | void;

export type ErrorQuery = FetchBaseQueryError | SerializedError | undefined;
export type CustomErrorResponse = {
    status: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR';
    title: string;
    message: string;
};
