import { Box, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { TEST_ID } from '~/test/constant';

import CustomFormField from '../../UI/CustomFormField';
import {
    FormDataFormRegistryStep2,
    FormFieldsFormRegistryStep2,
    SchemaFormRegistryStep2,
} from './FormRegistryStep2.types';

type Props = {
    onFieldsChange?: (values: Partial<FormFieldsFormRegistryStep2>) => void;
    handleSubmitStep: () => void;
};
export function FormRegistryStep2({ onFieldsChange, handleSubmitStep }: Props) {
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormDataFormRegistryStep2>({
        resolver: yupResolver(SchemaFormRegistryStep2),
        mode: 'onBlur',
    });

    const handleChange = async (fieldName: keyof FormFieldsFormRegistryStep2) => {
        const value = watch(fieldName);
        const isValid = await trigger?.(fieldName);
        onFieldsChange?.({ [fieldName]: isValid ? value : '' });
    };
    return (
        <Box
            data-test-id={TEST_ID.Form.SignUp}
            as='form'
            onSubmit={handleSubmit(handleSubmitStep)}
            noValidate
        >
            <CustomFormField
                data-test-id={TEST_ID.Input.Login}
                label='Логин для входа на сайт'
                name='login'
                type='text'
                placeholder='Логин'
                register={register}
                trigger={trigger}
                onFieldChange={handleChange}
                errors={errors}
            />
            <CustomFormField
                data-test-id={TEST_ID.Input.Password}
                label='Пароль'
                name='password'
                type='password'
                register={register}
                trigger={trigger}
                onFieldChange={handleChange}
                errors={errors}
                showVisibilityToggle
            />
            <CustomFormField
                data-test-id={TEST_ID.Input.PasswordConfirm}
                mb={0}
                label='Повторите пароль'
                name='passwordRepeat'
                type='password'
                register={register}
                trigger={trigger}
                onFieldChange={handleChange}
                errors={errors}
                showVisibilityToggle
            />
            <Button
                data-test-id={TEST_ID.Button.Submit}
                mt={12}
                type='submit'
                colorScheme='black'
                width='full'
                bg='blackAlpha.900'
                size='lg'
                isLoading={isSubmitting}
            >
                Зарегистрироваться
            </Button>
        </Box>
    );
}
