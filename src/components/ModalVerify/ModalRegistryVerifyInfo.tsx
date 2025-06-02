import { Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import img from '~/assets/modals/succesDesk.png';
import { selectAuthEmail } from '~/store/auth/auth-selector';
import { TEST_ID } from '~/test/test.constant';

import { CustomModalInfo } from '../UI/CustomModal/CustomModalInfo';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export function ModalRegistryVerifyInfo({ isOpen, onClose }: Props) {
    const email = useSelector(selectAuthEmail);
    const verifyItem = {
        img: img,
        alt: 'verify',
        title: 'Остался последний шаг. Нужно верифицировать ваш e-mail ',
        text: (
            <>
                Мы отправили вам на почту{' '}
                <Text as='span' fontWeight='600'>
                    {email}
                </Text>
                <br /> ссылку для верификации.
            </>
        ),
        footer: 'Не пришло письмо? Проверьте папку Спам.\n По другим вопросам свяжитесь',
    };
    return (
        <CustomModalInfo
            dataTestId={TEST_ID.Modal.SignUpSuccess}
            isOpen={isOpen}
            onClose={onClose}
            item={verifyItem}
        ></CustomModalInfo>
    );
}
