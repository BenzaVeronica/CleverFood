import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '~/query/auth/auth.api';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { setWasLoggedIn } from '~/store/auth/auth-slice';
import { useAppDispatch } from '~/store/hooks';
import { TEST_ID } from '~/test/test.constant';
import { useToastNotifications } from '~/utils/useToastNotifications';

import { ModalLogInFailed } from '../ModalLogIn/ModalLogInFailed';
import CustomFormField from '../UI/CustomFormField';
import { LoaderScreen } from '../UI/Loader/LoaderScreen';
import { FormDataLogin, FormFieldsLogin, SchemaLogin } from './FormLogin.schema';

export const FormLogin = () => {
    const {
        getValues,
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormDataLogin>({
        resolver: yupResolver(SchemaLogin),
        mode: 'onBlur',
    });

    const handleChange = async (fieldName: keyof FormFieldsLogin) => {
        await trigger(fieldName);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const { showErrorReduxMessage } = useToastNotifications();
    const onSubmit = async (data: FormDataLogin) => {
        try {
            await login(data).unwrap();
            dispatch(setWasLoggedIn(true));
            navigate('/');
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (isServerError(err.status)) {
                onOpen();
            }
            if (err.status === 401 || err.status === 403) {
                showErrorReduxMessage(TOAST_MESSAGE.SignInToast[err.status]);
            }
        }
    };
    const onRepeatSubmit = async () => {
        const values = getValues();
        await onSubmit(values);
    };

    return (
        <Box
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            data-test-id={TEST_ID.Form.SignIn}
        >
            {isLoading && <LoaderScreen />}
            <CustomFormField
                data-test-id={TEST_ID.Input.Login}
                label='Логин для входа на сайт'
                name='login'
                type='text'
                placeholder='Введите логин'
                register={register}
                onFieldChange={handleChange}
                errors={errors}
            />
            <CustomFormField
                data-test-id={TEST_ID.Input.Password}
                label='Пароль'
                name='password'
                type='password'
                placeholder='Пароль для сайта'
                register={register}
                onFieldChange={handleChange}
                errors={errors}
                showVisibilityToggle
            />

            <Button
                data-test-id={TEST_ID.Button.Submit}
                type='submit'
                colorScheme='black'
                width='full'
                bg='blackAlpha.900'
                size='lg'
                isLoading={isSubmitting}
            >
                Войти
            </Button>
            <ModalLogInFailed isOpen={isOpen} onClose={onClose} onSuccess={onRepeatSubmit} />
        </Box>
    );
};
