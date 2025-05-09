import { Image, ImageProps } from '@chakra-ui/react';

import { BASE_IMAGE_URL } from '~/query/api.constants';

type CustomImageProps = {
    src: string;
} & ImageProps;

function CustomImage({ src, ...rest }: CustomImageProps) {
    return <Image src={BASE_IMAGE_URL + src} {...rest} />;
}

export default CustomImage;
