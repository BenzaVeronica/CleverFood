import { CustomErrorResponse, CustomErrorStatusResponse } from '../types';
import { ErrorDescEnum, ErrorStatusMap } from './error.constants';

//NOTE: заменить
// export const isServerError = (status: number): boolean => {
//     if(!checkStatusIsNumber(status)) return false
//     return status >= 500 && status < 600
// };
export const isServerError = (status: CustomErrorStatusResponse): boolean => {
    if (!checkStatusIsNumber(status)) return false;
    return status >= 404 && status < 600;
};
export const getServerInfoError = (
    status: CustomErrorStatusResponse,
): CustomErrorResponse | null => {
    if (isServerError(status)) {
        return {
            status,
            title: ErrorStatusMap[500],
            message: ErrorDescEnum.LATER,
        };
    }
    return null;
};

export const checkStatusIsNumber = (status: CustomErrorStatusResponse): status is number =>
    typeof status === 'number';

export const isCustomErrorResponse = (error: unknown): error is CustomErrorResponse =>
    !!error && typeof error === 'object' && 'status' in error;
