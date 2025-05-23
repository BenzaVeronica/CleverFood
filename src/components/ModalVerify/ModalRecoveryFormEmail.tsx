import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import img from '~/assets/modals/recoveryDesk.png';
import { usePostForgetPswByEmailMutation } from '~/query/auth/auth.api';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { isServerError } from '~/query/errors/error.utils';
import { CustomErrorResponse } from '~/query/types';
import { setEmail } from '~/store/auth/auth-slice';
import { useAppDispatch } from '~/store/hooks';
import { TEST_ID } from '~/test/constant';
import { addError } from '~/widgets/error/error-slice';

import CustomFormField from '../UI/CustomFormField';
import CustomModal from '../UI/CustomModal';
import {
    FormDataModalRecoveryForm,
    FormFieldsModalRecoveryForm,
    SchemaModalRecoveryForm,
} from './ModalRecoveryFormEmail.types';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};
export function ModalRecoveryFormEmail({ isOpen, onClose, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormDataModalRecoveryForm>({
        resolver: yupResolver(SchemaModalRecoveryForm),
        defaultValues: {
            email: '',
            // ...getEmptyFilterValues(),
        },
        mode: 'onBlur',
    });
    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    const handleChange = async (fieldName: keyof FormFieldsModalRecoveryForm) => {
        await trigger(fieldName);
    };

    const dispatch = useAppDispatch();
    const [postForgetPswByEmail, { isLoading }] = usePostForgetPswByEmailMutation();
    const onSubmit = async (data: FormDataModalRecoveryForm) => {
        try {
            // await SchemaModalRecoveryForm.validate(data, { abortEarly: false });
            dispatch(setEmail(data.email));
            await postForgetPswByEmail(data).unwrap();
            onSuccess();
            reset();
        } catch (err) {
            const customError = err as CustomErrorResponse;
            if (isServerError(customError.status)) {
                dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
            }
            if (customError.status === 403) {
                dispatch(addError(TOAST_MESSAGE.SendVerificationCodeToast[403]));
                setError('email', {});
            }
            setValue('email', '');
        }
    };
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            dataTestId={TEST_ID.Modal.SendEmailModal}
            isLoading={isLoading}
        >
            <Flex flexDirection='column' gap={8} alignItems='center' p={8} textAlign='center'>
                <Image src={img} alt='RegistryVerifyInfo' w={{ base: '108px', lg: '206px' }} />

                <VStack spacing={6} as='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                    <VStack spacing={4}>
                        <Text fontSize='md' color='blackAlpha.900'>
                            Для восстановления входа введите <br /> ваш e-mail, куда можно отправить
                            уникальный код
                        </Text>
                        <CustomFormField
                            dataTestId={TEST_ID.Input.Email}
                            mb={0}
                            label='Ваш e-mail'
                            name='email'
                            type='email'
                            placeholder='e-mail'
                            register={register}
                            onFieldChange={handleChange}
                            errors={errors}
                            //   {...register("login")}
                        />
                    </VStack>

                    <Button
                        data-test-id={TEST_ID.Button.Submit}
                        type='submit'
                        colorScheme='black'
                        width='full'
                        size='lg'
                        fontWeight={600}
                        bg='blackAlpha.900'
                        isDisabled={isSubmitting}
                    >
                        Получить код
                    </Button>
                    <Text fontSize='xs' color='blackAlpha.600'>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </VStack>
            </Flex>
        </CustomModal>
    );
}
