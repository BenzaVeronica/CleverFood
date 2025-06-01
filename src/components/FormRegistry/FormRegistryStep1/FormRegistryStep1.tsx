import { Box, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { TEST_ID } from '~/test/test.constant';

import CustomFormField from '../../UI/CustomFormField';
import {
    FormDataFormRegistryStep1,
    FormFieldsFormRegistryStep1,
    SchemaFormRegistryStep1,
} from './FormRegistryStep1.types';

type Props = {
    onFieldsChange?: (values: Partial<FormFieldsFormRegistryStep1>) => void;
    handleSubmitStep: (values: FormFieldsFormRegistryStep1) => void;
};
export function FormRegistryStep1({ onFieldsChange, handleSubmitStep }: Props) {
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormDataFormRegistryStep1>({
        resolver: yupResolver(SchemaFormRegistryStep1),
        mode: 'onBlur',
    });

    const handleChange = async (fieldName: keyof FormFieldsFormRegistryStep1) => {
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
                data-test-id={TEST_ID.Input.FirstName}
                label='Ваше имя'
                name='firstName'
                type='text'
                placeholder='Имя'
                register={register}
                trigger={trigger}
                onFieldChange={handleChange}
                errors={errors}
            />
            <CustomFormField
                data-test-id={TEST_ID.Input.LastName}
                label='Ваша фамилия'
                name='lastName'
                type='text'
                placeholder='Фамилия'
                register={register}
                trigger={trigger}
                onFieldChange={handleChange}
                errors={errors}
            />
            <CustomFormField
                data-test-id={TEST_ID.Input.Email}
                mb={0}
                label='Ваш e-mail'
                name='email'
                type='email'
                placeholder='e-mail'
                register={register}
                trigger={trigger}
                onFieldChange={handleChange}
                errors={errors}
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
                Дальше
            </Button>
        </Box>
    );
}
