import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import FormLogin from '~/components/FormLogin';
import HeaderLogoTabs from '~/components/Layout/HeaderLogoTabs';
import LayoutFormWithImg from '~/components/Layout/LayoutFormWithImg';
import { ModalRecoveryForm } from '~/components/ModalVerify/ModalRecoveryForm';
import { ModalRecoveryFormEmail } from '~/components/ModalVerify/ModalRecoveryFormEmail';
import { ModalVerifyCode } from '~/components/ModalVerify/ModalVerifyCode';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { useAppDispatch } from '~/store/hooks';
import { ModalsIdEnum } from '~/store/modals/modals.constants';
import { TEST_ID } from '~/test/constant';
import { addSuccess } from '~/widgets/error/error-slice';
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

    const dispatch = useAppDispatch();
    const location = useLocation();
    useEffect(() => {
        if (location.state?.verifiedSuccess) {
            dispatch(addSuccess(TOAST_MESSAGE.EmailVerificationToast[200]));
        }
    }, [location.state, dispatch]);

    console.log(currentModal);

    return (
        <LayoutFormWithImg>
            <ErrorNotification />
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
                // isOpen={true}
                isOpen={currentModal === ModalsIdEnum.recoveryForm}
                onClose={onClearCurrentModal}
                onSuccess={onClearCurrentModal}
            />
        </LayoutFormWithImg>
    );
}

export default LoginPage;
