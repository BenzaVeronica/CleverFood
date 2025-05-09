import { IconProps } from '@chakra-ui/react';
import { JSX } from 'react';

type FooterIconProps = {
    isActive: boolean;
    boxSize: number;
} & IconProps;

export type FooterMenuItem = {
    text: string;
    link: string;
    icon: (props: FooterIconProps) => JSX.Element;
};
