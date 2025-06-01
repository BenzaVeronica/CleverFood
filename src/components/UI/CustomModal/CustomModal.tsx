import { Icon, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { TEST_ID } from '~/test/test.constant';

import BsXCircle from '../../../assets/BsXCircle.svg?react';
import LoaderScreen from '../Loader/LoaderScreen';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    dataTestId?: string;
    isLoading?: boolean;
};

export function CustomModal({ isOpen, onClose, children, dataTestId, isLoading }: Props) {
    if (isLoading) return <LoaderScreen />;
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                data-test-id={dataTestId}
                w={{ base: '316px', lg: '396px' }}
                position='relative'
            >
                <Icon
                    data-test-id={TEST_ID.Button.Close}
                    as={BsXCircle}
                    boxSize={6}
                    onClick={onClose}
                    position='absolute'
                    top={6}
                    right={6}
                    cursor='pointer'
                />

                <ModalBody p={8} whiteSpace='pre-line'>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
