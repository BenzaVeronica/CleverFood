import { Icon, IconProps } from '@chakra-ui/react';

import IconPlusFilled from '~/assets/BsFillXCircleFill.svg?react';
import IconPlusOutline from '~/assets/BsXCircle.svg?react';

type Variant = 'filled' | 'outline';

type CustomIconProps = IconProps & {
    variant?: Variant;
    isRotate?: boolean;
};

export const IconPlus = ({ variant = 'filled', isRotate = true, ...props }: CustomIconProps) => {
    const transform = isRotate ? 'rotate(45deg)' : undefined;

    return (
        <Icon
            as={variant === 'filled' ? IconPlusFilled : IconPlusOutline}
            transform={transform}
            transition='transform 0.2s'
            {...props}
        />
    );
};
