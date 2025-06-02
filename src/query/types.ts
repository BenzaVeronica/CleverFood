import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ResponseData = {
    statusCode: number;
    message: string;
};

export type OptionType = {
    id: string;
    label: string;
};

export type MongoEntity = {
    _id: string;
    createdAt: string;
};

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

export interface ResponseParams {
    limit: number;
    page?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    allergens?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    searchString?: string;
}
export type ResponseParamsOrNull = Partial<ResponseParams> | null | undefined | void;
export type ResponseParamsWithId = {
    id: string;
} & ResponseParams;
export type ResponseParamsWithOptionalId = {
    id?: string;
} & ResponseParams;

export type ErrorQuery = FetchBaseQueryError | SerializedError | undefined;
export type CustomErrorStatusResponse =
    | number
    | 'FETCH_ERROR'
    | 'PARSING_ERROR'
    | 'TIMEOUT_ERROR'
    | 'CUSTOM_ERROR';

export type CustomErrorResponse = {
    status: CustomErrorStatusResponse;
    title: string;
    message: string;
};
