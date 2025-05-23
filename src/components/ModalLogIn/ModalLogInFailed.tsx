import img from '~/assets/modals/recoveryDesk.png';
import { TEST_ID } from '~/test/constant';

import { CustomModalInfo } from '../UI/CustomModal/CustomModalInfo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const item = {
    img: img,
    title: 'Вход не выполнен',
    text: 'Что-то пошло не так. \n Попробуйте еще раз',
    btn: 'Повторить',
};
export function ModalLogInFailed({ isOpen, onClose, onSuccess }: Props) {
    return (
        <CustomModalInfo
            dataTestIdBtn={TEST_ID.Button.Repeat}
            dataTestId={TEST_ID.Modal.SignInError}
            isOpen={isOpen}
            onClose={onClose}
            item={item}
            onSubmit={onSuccess}
        ></CustomModalInfo>
    );
}
