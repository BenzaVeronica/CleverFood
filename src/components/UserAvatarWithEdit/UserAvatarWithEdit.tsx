import { Avatar, Box, Icon, IconButton, useDisclosure } from '@chakra-ui/react';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import ImageIcon from '~/assets/image-circle-icon.svg?react';

import ModalImageUploader from '../ModalImageUploader';

type Props = {
    image: string;
    // children: ReactNode;
};
export function UserAvatarWithEdit({ image }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box position='relative' w='fit-content' mb={4}>
                <Avatar size='2xl' src={image} />
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
            <ModalImageUploader
                // dataTestId={TEST_ID.Recipe.ImageBlockInputFile}
                isOpen={isOpen}
                onClose={onClose}
                // onSuccess={handleImageSuccess}
                // uploadFor={imageFor}
                onSuccess={() => {}}
                uploadFor='image'
                currentImage={image}
                isEditCrop
            />
        </>
    );
}
