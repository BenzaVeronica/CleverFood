import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { useAppDispatch } from '~/store/hooks';
import { TEST_ID } from '~/test/test.constant';
import { addError } from '~/widgets/error/error-slice';

import ModalChangePswFormSettings from '../ModalChangePswFormSettings';
import CustomFormField from '../UI/CustomFormField';
import Title from '../UI/Title';
import UserAvatarWithEdit from '../UserAvatarWithEdit';
import { FormDataSettings, FormFieldsSettings, SchemaSettings } from './FormSettings.types';

export const FormSettings = () => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormDataSettings>({
        resolver: yupResolver(SchemaSettings),
        mode: 'onBlur',
    });

    const handleChange = async (fieldName: keyof FormFieldsSettings) => {
        await trigger(fieldName);
    };

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data: FormDataSettings) => {
        try {
            console.log(data);
            // await login(data).unwrap();
            navigate('/');
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (isServerError(err.status)) {
                // setIsOpen(true);
            }
            if (err.status === 401 || err.status === 403) {
                dispatch(addError(TOAST_MESSAGE.SignInToast[err.status]));
            }
        }
    };

    return (
        <Box
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            data-test-id={TEST_ID.Form.SignIn}
        >
            <Title>Авторизация и персонализация</Title>
            <UserAvatarWithEdit />
            {/* {isLoading && <LoaderScreen />} */}
            <SimpleGrid columns={2} spacing={4}>
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
                <CustomFormField
                    data-test-id={TEST_ID.Input.Login}
                    label='Логин для входа на сайт'
                    name='login'
                    type='text'
                    placeholder='Введите логин'
                    register={register}
                    onFieldChange={handleChange}
                    errors={errors}
                    infoText='Логин не менее 5 символов, только латиница'
                />
                <Button variant='plain' size='lg' onClick={onOpen} justifyContent='start'>
                    Сменить пароль
                </Button>
            </SimpleGrid>
            <Button
                data-test-id={TEST_ID.Button.Submit}
                type='submit'
                colorScheme='black'
                width={{ base: 'full', md: '248px' }}
                bg='blackAlpha.900'
                size='lg'
                isLoading={isSubmitting}
                mt={4}
            >
                Сохранить изменения
            </Button>
            <ModalChangePswFormSettings isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
