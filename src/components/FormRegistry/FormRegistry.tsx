import { Progress, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { FormRegistryStep1 } from '~/components/FormRegistry/FormRegistryStep1/FormRegistryStep1';
import { FormRegistryStep2 } from '~/components/FormRegistry/FormRegistryStep2/FormRegistryStep2';
import { useRegisterUserMutation } from '~/query/auth/auth.api';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { isServerError } from '~/query/errors/error.utils';
import { CustomErrorResponse } from '~/query/types';
import { setEmail } from '~/store/auth/auth-slice';
import { useAppDispatch } from '~/store/hooks';
import { TEST_ID } from '~/test/constant';
import { addError } from '~/widgets/error/error-slice';

import { LoadingScreenError } from '../WithLoadingError/WithLoadingError';
import { FormRegistryValues } from './FormRegistry.types';

const getRegisterStep = (indexStep: number) => {
    switch (indexStep) {
        case 1:
            return 'Личная информация';
        case 2:
            return 'Логин и пароль';
        default:
            return 'Личная информация';
    }
};
const defaultFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    password: '',
    repeatPassword: '',
};
type Props = {
    onSuccess: () => void;
};
export function FormRegistry({ onSuccess }: Props) {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState<FormRegistryValues>(defaultFormValues);

    const getProgress = () => {
        const allCount = Object.keys(defaultFormValues).length;
        console.log(formValues);
        const filled = Object.values(formValues).filter(Boolean).length;
        return Math.round((filled / allCount) * 100);
    };

    const handleFieldsChangeStep = (values: Partial<FormRegistryValues>) =>
        setFormValues((prev) => ({ ...prev, ...values }));

    const handleSubmitStep1 = () => setStep(2);

    const dispatch = useAppDispatch();
    const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
    const handleSubmit = async () => {
        try {
            const { repeatPassword, ...requestData } = formValues;
            await registerUser(requestData).unwrap();
            dispatch(setEmail(requestData.email));
            onSuccess();
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (isServerError(err.status)) {
                dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
            }
            console.log(err);

            if (err.status === 400) {
                dispatch(addError({ title: err.title, description: '' }));
            }
        }
    };
    return (
        <>
            <LoadingScreenError isLoading={isLoading} isError={isError} />
            <Text fontSize='md'>
                Шаг {step}. {getRegisterStep(step)}
            </Text>
            <Progress
                data-test-id={TEST_ID.Progress.SignUp}
                hasStripe
                value={getProgress()}
                size='sm'
                mb={6}
            />
            {step === 1 ? (
                <FormRegistryStep1
                    onFieldsChange={handleFieldsChangeStep}
                    handleSubmitStep={handleSubmitStep1}
                />
            ) : (
                <FormRegistryStep2
                    onFieldsChange={handleFieldsChangeStep}
                    handleSubmitStep={handleSubmit}
                />
            )}
        </>
    );
}
