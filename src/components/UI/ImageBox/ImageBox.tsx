import { Box, BoxProps, Icon, Image } from '@chakra-ui/react';

import ImageFill from '~/assets/BsFillImageFill.svg?react';

type ImageBoxProps = {
    image?: string | null;
    onClick?: () => void;
    boxProps?: BoxProps;
    dataTestId?: string;
    dataTestIdPreview?: string;
    isEditCrop?: boolean;
    widthCircle?: number;
};

export const ImageBox = ({
    image,
    onClick,
    boxProps = {},
    dataTestId,
    dataTestIdPreview,
    isEditCrop = false,
    widthCircle = 180,
}: ImageBoxProps) => (
    <Box
        data-test-id={dataTestId}
        as={onClick && 'button'}
        type={onClick && 'button'}
        onClick={onClick}
        bg='blackAlpha.200'
        borderRadius='md'
        w='full'
        h='full'
        display='flex'
        justifyContent='center'
        alignItems='center'
        overflow='hidden'
        position='relative'
        _hover={{ bg: 'blackAlpha.300' }}
        _before={{
            content: isEditCrop && image ? '""' : 'none',
            position: 'absolute',
            inset: 0,
            bg: 'lime.600',
            opacity: '0.5',
            maskImage: `radial-gradient(circle ${widthCircle / 2}px at center, transparent ${(widthCircle - 1) / 2}px, black ${widthCircle / 2}px)`,
        }}
        {...boxProps}
    >
        {image ? (
            <Image
                src={image}
                alt='Загруженное изображение'
                objectFit='cover'
                w='full'
                h='full'
                data-test-id={dataTestIdPreview}
            />
        ) : (
            <Icon as={ImageFill} color='blackAlpha.500' boxSize={8} />
        )}
    </Box>
);
