import { Box, BoxProps, Icon, Image } from '@chakra-ui/react';

import ImageFill from '~/assets/BsFillImageFill.svg?react';

type ImageBoxProps = {
    image?: string | null;
    onClick?: () => void;
    boxProps?: BoxProps;
    dataTestId?: string;
    dataTestIdPreview?: string;
};

export const ImageBox = ({
    image,
    onClick,
    boxProps = {},
    dataTestId,
    dataTestIdPreview,
}: ImageBoxProps) => (
    <Box
        data-test-id={dataTestId}
        // data-test-id={image ? dataTestIdPreview : dataTestId}
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
