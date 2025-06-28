import { Box, Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ErrorDescEnum, TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { useUpdateUserPasswordMutation } from '~/query/user/user.api';
import { TEST_ID } from '~/test/test.constant';
import { cmpString } from '~/utils/cmpString';
import { useToastNotifications } from '~/utils/useToastNotifications';

import CustomFormField from '../UI/CustomFormField';
import CustomModal from '../UI/CustomModal';
import {
    FormDataFormModalChangePsw,
    FormFieldsFormModalChangePsw,
    SchemaFormModalChangePsw,
} from './ModalChangePswFormSettings.schema';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
};
export function ModalChangePswFormSettings({ isOpen, onClose, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        trigger,
        setError,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormDataFormModalChangePsw>({
        resolver: yupResolver(SchemaFormModalChangePsw),
        mode: 'onBlur',
    });

    const handleChange = async (fieldName: keyof FormFieldsFormModalChangePsw) => {
        await trigger(fieldName);
    };
    const [updatePswProfile] = useUpdateUserPasswordMutation();

    const { handleServerError, showSuccessReduxMessage, showErrorReduxMessage } =
        useToastNotifications();
    const onSubmit = async (data: FormDataFormModalChangePsw) => {
        try {
            const { passwordConfirm, ...serverData } = data;
            await updatePswProfile(serverData).unwrap();
            onSuccess?.();
            showSuccessReduxMessage(TOAST_MESSAGE.RestorePsw[200]);
        } catch (error) {
            const err = error as CustomErrorResponse;
            handleServerError(error);
            if (err.status === 400) {
                showErrorReduxMessage({ title: err.title, description: ErrorDescEnum.AGAIN });
                if (cmpString(err.title, TOAST_MESSAGE.RestorePsw.inccorect.title)) {
                    setError('password', {
                        type: 'server',
                        message: '',
                    });
                } else {
                    setError('passwordConfirm', {
                        type: 'server',
                        message: '',
                    });
                }
            }
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={handleClose}
            dataTestId={TEST_ID.Modal.ResetCredentialsModal}
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
                    Сменить пароль
                </Text>
                <CustomFormField
                    dataTestId={TEST_ID.Input.Login}
                    label='Введите старый пароль'
                    name='password'
                    type='text'
                    register={register}
                    onFieldChange={handleChange}
                    errors={errors}
                />
                <CustomFormField
                    dataTestId={TEST_ID.Input.Password}
                    label='Введите новый пароль'
                    name='newPassword'
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
                    Сохранить пароль
                </Button>
            </Box>
        </CustomModal>
    );
}
