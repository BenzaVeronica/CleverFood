import { Flex, HStack, Image, PinInput, PinInputField, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import img from '~/assets/modals/emptyDesk.png';
import { useVerifyOtpMutation } from '~/query/auth/auth.api';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isCustomErrorResponse } from '~/query/errors/error.utils';
import { selectAuthEmail } from '~/store/auth/auth-selector';
import { TEST_ID } from '~/test/test.constant';
import { useToastNotifications } from '~/utils/useToastNotifications';

import CustomModal from '../UI/CustomModal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};
export function ModalVerifyCode({ isOpen, onClose, onSuccess }: Props) {
    const [isInvalid, setIsInvalid] = useState(false);
    const [code, setCode] = useState('');
    const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();

    useEffect(() => {
        if (code.length === 6) {
            handleVerify();
        }
    }, [code]);

    const email = useSelector(selectAuthEmail);

    const { handleServerError } = useToastNotifications();
    const handleVerify = async () => {
        if (!email) return;
        try {
            setIsInvalid(false);
            await verifyOtp({
                email: email,
                otpToken: code,
            }).unwrap();
            onSuccess();
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (err.status === 403) setIsInvalid(true);
            handleServerError(error);
            setCode('');
        }
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            dataTestId={TEST_ID.Modal.VerificationCodeModal}
            isLoading={isLoading}
        >
            <Flex flexDirection='column' alignItems='center' textAlign='center'>
                <Image
                    src={img}
                    alt='RegistryVerifyInfo'
                    w={{ base: '108px', lg: '206px' }}
                    pb={8}
                />
                {isCustomErrorResponse(error) && error?.status === 403 && (
                    <Text fontSize='2xl' color='blackAlpha.900' fontWeight={700}>
                        Неверный код
                    </Text>
                )}
                <Text color='blackAlpha.900'>
                    Мы отправили вам на e-mail{' '}
                    <Text as='span' fontWeight='600'>
                        {email}
                    </Text>
                    <br /> шестизначный код. Введите его ниже.
                </Text>
                <HStack mb={6} mt={4}>
                    <PinInput
                        otp
                        size='md'
                        value={code}
                        onChange={(value) => {
                            setCode(value);
                        }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <PinInputField
                                data-test-id={`${TEST_ID.Input.VerificationCode}-${i + 1}`}
                                key={i}
                                borderColor={isInvalid ? `red` : 'inherit'}
                            />
                        ))}
                    </PinInput>
                </HStack>

                <Text fontSize='xs' color='blackAlpha.600' w={{ base: '180px', lg: '100%' }}>
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
            </Flex>
        </CustomModal>
    );
}
