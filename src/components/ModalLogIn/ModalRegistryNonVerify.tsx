import img from '~/assets/modals/errorDesk.png';
import { TEST_ID } from '~/test/constant';

import { CustomModalInfo } from '../UI/CustomModal/CustomModalInfo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};
const logInFailedItem = {
    img: img,
    title: 'Упс! Что-то пошло не так',
    text: 'Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.',
    footer: 'Остались вопросы? Свяжитесь',
};
export function ModalRegistryNonVerify({ isOpen, onClose }: Props) {
    return (
        <CustomModalInfo
            dataTestId={TEST_ID.Modal.EmailVerificationFailed}
            isOpen={isOpen}
            onClose={onClose}
            item={logInFailedItem}
        ></CustomModalInfo>
    );
}
