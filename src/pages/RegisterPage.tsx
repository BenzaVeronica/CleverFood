import { useState } from 'react';
import { useNavigate } from 'react-router';

import { FormRegistry } from '~/components/FormRegistry/FormRegistry';
import HeaderLogoTabs from '~/components/Layout/HeaderLogoTabs';
import LayoutFormWithImg from '~/components/Layout/LayoutFormWithImg';
import { ModalRegistryNonVerify } from '~/components/ModalLogIn/ModalRegistryNonVerify';
import ModalRegistryVerifyInfo from '~/components/ModalVerify';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { ModalsIdEnum } from '~/store/modals/modals.constants';
import { useEmailVerificationRedirect } from '~/utils/useEmailVerificationRedirect';

type ModalVariant = ModalsIdEnum | null;
export function RegisterPage() {
    const [currentModal, setCurrentModal] = useState<ModalVariant>(null);

    const navigate = useNavigate();
    const openRegistryVerify = () => setCurrentModal(ModalsIdEnum.registryVerify);
    const onClearCurrentModal = () => setCurrentModal(null);
    const openRegistryNonVerify = () => {
        setCurrentModal(ModalsIdEnum.registryNonVerify);
    };
    const navigateToLoginPage = () => navigate(PageRoutes.LOGIN);

    useEmailVerificationRedirect(openRegistryNonVerify);

    return (
        <LayoutFormWithImg>
            <HeaderLogoTabs defaultTab='register' />

            <FormRegistry onSuccess={openRegistryVerify} />

            <ModalRegistryVerifyInfo
                isOpen={currentModal === ModalsIdEnum.registryVerify}
                onClose={navigateToLoginPage}
            />

            <ModalRegistryNonVerify
                isOpen={currentModal === ModalsIdEnum.registryNonVerify}
                onClose={onClearCurrentModal}
            />
        </LayoutFormWithImg>
    );
}
