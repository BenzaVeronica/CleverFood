import { Box, Button, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { TEST_ID } from '~/test/test.constant';
import { useGeneralServerError } from '~/utils/useGeneralServerError';

import CustomFormField from '../UI/CustomFormField';
import CustomModal from '../UI/CustomModal';
import {
    FormDataFormModalChangePsw,
    FormFieldsFormModalChangePsw,
    SchemaFormModalChangePsw,
} from './ModalChangePswFormSettings.types';

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
        formState: { errors, isSubmitting },
    } = useForm<FormDataFormModalChangePsw>({
        resolver: yupResolver(SchemaFormModalChangePsw),
        mode: 'onBlur',
    });
    const handleChange = async (fieldName: keyof FormFieldsFormModalChangePsw) => {
        await trigger(fieldName);
    };
    // const dispatch = useAppDispatch();
    // const [resetPswProfile, { isLoading }] = useResetPasswordMutation();

    const { handleServerError } = useGeneralServerError();
    const onSubmit = async (data: FormDataFormModalChangePsw) => {
        try {
            console.log(data);
            // await resetPswProfile({

            //     email,
            //     ...data,
            // }).unwrap();
            onSuccess?.();
            // dispatch(addSuccess(TOAST_MESSAGE.RestoreCredentials[200]));
        } catch (error) {
            handleServerError(error);
        }
    };
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            dataTestId={TEST_ID.Modal.ResetCredentialsModal}
            // isLoading={isLoading}
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
                    name='oldpassword'
                    type='text'
                    register={register}
                    onFieldChange={handleChange}
                    errors={errors}
                />
                <CustomFormField
                    dataTestId={TEST_ID.Input.Password}
                    label='Введите новый пароль'
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
                    Сохранить пароль
                </Button>
            </Box>
        </CustomModal>
    );
}
