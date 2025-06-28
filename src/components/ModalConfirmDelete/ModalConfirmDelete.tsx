import img from '~/assets/modals/recoveryDesk.png';
import { TEST_ID } from '~/test/test.constant';

import { CustomModalInfo } from '../UI/CustomModal/CustomModalInfo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const item = {
    img: img,
    title: 'Действительно хотите удалить свой аккаунт?',
    text: 'Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса, которые вы использовали.',
    extraText: 'Мы удалим все ваши опубликованные рецепты и записи в блоге.',
    btn: 'Удалить мой аккаунт',
    btnCancel: 'Выйти без сохранения',
    footer: 'Остались вопросы? Свяжитесь',
};
export function ModalConfirmDelete({ isOpen, onClose, onSuccess }: Props) {
    return (
        <CustomModalInfo
            dataTestId={TEST_ID.Modal.PreventiveModal}
            isOpen={isOpen}
            onClose={onClose}
            item={item}
            onSubmit={onSuccess}
        ></CustomModalInfo>
    );
}
