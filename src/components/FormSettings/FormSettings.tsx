import { Box, Button, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { getImagePath } from '~/query/api.constants';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { useGetUserMeQuery, useUpdateUserInfoMutation } from '~/query/user/user.api';
import { TEST_ID } from '~/test/test.constant';
import { useToastNotifications } from '~/utils/useToastNotifications';

import ModalChangePswFormSettings from '../ModalChangePswFormSettings';
import CustomFormField from '../UI/CustomFormField';
import { LoaderScreen } from '../UI/Loader/LoaderScreen';
import Title from '../UI/Title';
import UserAvatarWithEdit from '../UserAvatarWithEdit';
import { FormDataSettings, FormFieldsSettings, SchemaSettings } from './FormSettings.schema';

export const FormSettings = () => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormDataSettings>({
        resolver: yupResolver(SchemaSettings),
        mode: 'onBlur',
    });

    const handleChange = async (fieldName: keyof FormFieldsSettings) => {
        await trigger(fieldName);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: me } = useGetUserMeQuery();
    const [updateUserInfo, { isLoading, error }] = useUpdateUserInfoMutation();

    useEffect(() => {
        if (me) {
            reset({
                firstName: me.firstName || '',
                lastName: me.lastName || '',
            });
        }
    }, [me, reset, error]);

    const { handleServerError, showSuccessReduxMessage } = useToastNotifications();
    const onSubmit = async (data: FormDataSettings) => {
        try {
            await updateUserInfo(data).unwrap();
            showSuccessReduxMessage(TOAST_MESSAGE.UpdateProfileInfo[200]);
        } catch (error) {
            handleServerError(error);
        }
    };

    return (
        <>
            <Box
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                data-test-id={TEST_ID.Form.SignIn}
            >
                <Title>Авторизация и персонализация</Title>
                <UserAvatarWithEdit image={getImagePath(me?.photoLink)} />
                {isLoading && <LoaderScreen />}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
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
                        isDisabled
                    />
                    <CustomFormField
                        data-test-id={TEST_ID.Input.Login}
                        label='Логин для входа на сайт'
                        name='login'
                        type='text'
                        placeholder='Введите логин'
                        infoText='Логин не менее 5 символов, только латиница'
                        isDisabled
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
            </Box>
            <ModalChangePswFormSettings isOpen={isOpen} onClose={onClose} onSuccess={onClose} />
        </>
    );
};
