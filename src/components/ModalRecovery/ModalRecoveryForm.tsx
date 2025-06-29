import { Box, Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useResetPasswordMutation } from '~/query/auth/auth.api';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { selectAuthEmail } from '~/store/auth/auth-selector';
import { TEST_ID } from '~/test/test.constant';
import { useToastNotifications } from '~/utils/useToastNotifications';

import CustomFormField from '../UI/CustomFormField';
import CustomModal from '../UI/CustomModal';
import {
    FormDataFormModalRecovery,
    FormFieldsFormModalRecovery,
    SchemaFormModalRecovery,
} from './ModalRecoveryForm.schema';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};
export function ModalRecoveryForm({ isOpen, onClose, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormDataFormModalRecovery>({
        resolver: yupResolver(SchemaFormModalRecovery),
        mode: 'onBlur',
    });
    const handleChange = async (fieldName: keyof FormFieldsFormModalRecovery) => {
        await trigger(fieldName);
    };
    const email = useSelector(selectAuthEmail);
    const [resetPswProfile, { isLoading }] = useResetPasswordMutation();

    const { handleServerError, showSuccessReduxMessage } = useToastNotifications();
    const onSubmit = async (data: FormDataFormModalRecovery) => {
        try {
            await resetPswProfile({
                email,
                ...data,
            }).unwrap();
            onSuccess();
            showSuccessReduxMessage(TOAST_MESSAGE.RestoreCredentials[200]);
        } catch (error) {
            handleServerError(error);
        }
    };
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            dataTestId={TEST_ID.Modal.ResetCredentialsModal}
            isLoading={isLoading}
        >
            <Box as='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <Text
                    mb={6}
                    fontSize='2xl'
                    color='blackAlpha.900'
                    fontWeight={700}
                    textAlign='center'
                    w='90%'
                >
                    Восстановление аккаунта
                </Text>
                <CustomFormField
                    dataTestId={TEST_ID.Input.Login}
                    label='Логин для входа на сайт'
                    name='login'
                    type='text'
                    placeholder='Логин'
                    register={register}
                    onFieldChange={handleChange}
                    infoText='Логин не менее 5 символов, только латиница'
                    errors={errors}
                />
                <CustomFormField
                    dataTestId={TEST_ID.Input.Password}
                    label='Пароль'
                    name='password'
                    type='password'
                    register={register}
                    onFieldChange={handleChange}
                    errors={errors}
                    infoText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    showVisibilityToggle
                />
                <CustomFormField
                    dataTestId={TEST_ID.Input.PasswordConfirm}
                    mb={0}
                    label='Повторите пароль'
                    name='passwordConfirm'
                    type='password'
                    register={register}
                    onFieldChange={handleChange}
                    errors={errors}
                    showVisibilityToggle
                />

                <Button
                    data-test-id={TEST_ID.Button.Submit}
                    mt={8}
                    type='submit'
                    colorScheme='black'
                    width='full'
                    fontSize='lg'
                    fontWeight={600}
                    bg='blackAlpha.900'
                    isDisabled={isSubmitting}
                >
                    Зарегистрироваться
                </Button>
            </Box>
        </CustomModal>
    );
}
