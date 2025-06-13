import { useDispatch } from 'react-redux';

import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { addError } from '~/widgets/error/error-slice';

export function useGeneralServerError() {
    const dispatch = useDispatch();

    const handleServerError = (error: unknown) => {
        const customError = error as CustomErrorResponse;

        if (isServerError(customError.status)) {
            dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
        }
    };

    return {
        handleServerError,
    };
}
