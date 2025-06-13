import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
