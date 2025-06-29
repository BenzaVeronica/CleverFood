import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import FormLogin from '~/components/FormLogin';
import HeaderLogoTabs from '~/components/Layout/HeaderLogoTabs';
import LayoutFormWithImg from '~/components/Layout/LayoutFormWithImg';
import { ModalRecoveryForm } from '~/components/ModalRecovery/ModalRecoveryForm';
import { ModalRecoveryFormEmail } from '~/components/ModalRecovery/ModalRecoveryFormEmail';
import { ModalVerifyCode } from '~/components/ModalVerify/ModalVerifyCode';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { ModalsIdEnum } from '~/store/modals/modals.constants';
import { TEST_ID } from '~/test/test.constant';
import { useToastNotifications } from '~/utils/useToastNotifications';
import ErrorNotification from '~/widgets/error/ErrorNotification';

type ModalVariant = ModalsIdEnum | null;
function LoginPage() {
    const [currentModal, setCurrentModal] = useState<ModalVariant | null>(null);
    const modalSequence: ModalVariant[] = [
        ModalsIdEnum.emailForm,
        ModalsIdEnum.verifyOtp,
        ModalsIdEnum.recoveryForm,
    ];

    const handleSuccess = () => {
        const nextIndex = modalSequence.indexOf(currentModal!) + 1;
        setCurrentModal(nextIndex < modalSequence.length ? modalSequence[nextIndex] : null);
    };
    const onClearCurrentModal = () => {
        setCurrentModal(null);
    };

    const location = useLocation();
    const { showSuccessReduxMessage } = useToastNotifications();
    useEffect(() => {
        if (location.state?.verifiedSuccess) {
            showSuccessReduxMessage(TOAST_MESSAGE.EmailVerificationToast[200]);
        }
    }, [location.state]);

    return (
        <LayoutFormWithImg>
            <ErrorNotification isPosition />
            <HeaderLogoTabs />
            <FormLogin />
            <Text
                data-test-id={TEST_ID.Button.ForgotPassword}
                cursor='pointer'
                mt={4}
                size='md'
                fontWeight={600}
                textAlign='center'
                onClick={() => setCurrentModal(ModalsIdEnum.emailForm)}
            >
                Забыли логин или пароль?
            </Text>
            <ModalRecoveryFormEmail
                isOpen={currentModal === ModalsIdEnum.emailForm}
                onClose={onClearCurrentModal}
                onSuccess={handleSuccess}
            />
            <ModalVerifyCode
                isOpen={currentModal === ModalsIdEnum.verifyOtp}
                onClose={onClearCurrentModal}
                onSuccess={handleSuccess}
            />
            <ModalRecoveryForm
                isOpen={currentModal === ModalsIdEnum.recoveryForm}
                onClose={onClearCurrentModal}
                onSuccess={onClearCurrentModal}
            />
        </LayoutFormWithImg>
    );
}

export default LoginPage;
