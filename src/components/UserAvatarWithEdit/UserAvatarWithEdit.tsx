import { Avatar, Box, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import ImageIcon from '~/assets/image-circle-icon.svg?react';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { useCreateUserPhotoMutation } from '~/query/user/user.api';
import { useToastNotifications } from '~/utils/useToastNotifications';

import { ModalImageCanvaUploader } from '../ModalImageUploader/ModalImageCanvaUploader';

type Props = {
    image?: string;
};
export function UserAvatarWithEdit({ image }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [createUserPhoto] = useCreateUserPhotoMutation();
    const { handleServerError, showSuccessReduxMessage } = useToastNotifications();
    const [curImage, setCurImage] = useState(image || undefined);
    useEffect(() => {
        setCurImage(image);
    }, [image]);

    const handleSuccess = async (file: Blob) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await createUserPhoto(formData).unwrap();
            setCurImage(response.photoLink);
            showSuccessReduxMessage(TOAST_MESSAGE.ProfilePhotoUpdate[200]);
        } catch (error) {
            handleServerError(error);
        }
    };
    return (
        <Flex w='full' justifyContent={{ base: 'center', xl: 'left' }}>
            <Box position='relative' w='fit-content' mb={4}>
                <Avatar size={{ base: 'xl', xl: '2xl' }} src={curImage} />
                <IconButton
                    aria-label={ACCESSIBILITY.image.edit}
                    position='absolute'
                    bottom={0}
                    right={0}
                    icon={<Icon as={ImageIcon} boxSize={7} />}
                    borderRadius='50%'
                    border='2px'
                    borderColor='white'
                    onClick={onOpen}
                />
            </Box>
            <ModalImageCanvaUploader
                isOpen={isOpen}
                onClose={onClose}
                onSuccessCrop={handleSuccess}
                currentImage={curImage}
            />
        </Flex>
    );
}
