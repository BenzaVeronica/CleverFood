import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { addError, addSuccess } from '~/widgets/error/error-slice';

export type ToastMsg = {
    title: string;
    description: string;
};

type ErrorHandlerOptions = {
    redirectPath?: string;
    onError?: () => void;
};

export function useToastNotifications() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleServerError = (error: unknown, options?: ErrorHandlerOptions) => {
        const customError = error as CustomErrorResponse;

        if (isServerError(customError.status)) {
            dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
            if (options?.onError) {
                options.onError();
            }
            if (options?.redirectPath) {
                navigate(options.redirectPath);
            }
        }
    };

    const showSuccessReduxMessage = (message: ToastMsg) => dispatch(addSuccess(message));
    const showErrorReduxMessage = (message: ToastMsg) => dispatch(addError(message));

    return {
        handleServerError,
        showSuccessReduxMessage,
        showErrorReduxMessage,
    };
}
