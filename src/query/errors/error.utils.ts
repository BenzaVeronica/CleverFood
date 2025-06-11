import { CustomErrorResponse, CustomErrorStatusResponse } from './error.type';

export const isServerError = (status: CustomErrorStatusResponse): boolean => {
    if (!checkStatusIsNumber(status)) return false;
    return status >= 500 && status < 600;
};
export const checkStatusIsNumber = (status: CustomErrorStatusResponse): status is number =>
    typeof status === 'number';

export const isCustomErrorResponse = (error: unknown): error is CustomErrorResponse =>
    !!error && typeof error === 'object' && 'status' in error;
