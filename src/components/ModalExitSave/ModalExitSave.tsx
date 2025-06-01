import img from '~/assets/modals/recoveryDesk.png';
import { TEST_ID } from '~/test/test.constant';

import { IconPencil } from '../Icons/IconPencil';
import { CustomModalInfo } from '../UI/CustomModal/CustomModalInfo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onCancel: () => void;
};

const item = {
    img: img,
    title: 'Выйти без сохранения?',
    text: 'Чтобы сохранить, нажмите кнопку \n сохранить черновик',
    btn: 'Сохранить черновик',
    btnIcon: <IconPencil />,
    btnCancel: 'Выйти без сохранения',
};
export function ModalExitSave({ isOpen, onClose, onSuccess, onCancel }: Props) {
    return (
        <CustomModalInfo
            dataTestId={TEST_ID.Modal.PreventiveModal}
            isOpen={isOpen}
            onClose={onClose}
            item={item}
            onSubmit={onSuccess}
            onCancel={onCancel}
        ></CustomModalInfo>
    );
}
