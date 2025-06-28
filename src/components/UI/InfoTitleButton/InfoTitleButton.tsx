import { VStack } from '@chakra-ui/react';

import ButtonTransit from '../ButtonTransit';
import Title from '../Title';
type Props = {
    title: string;
    btn: string;
    link?: string;
    linkText?: string;
    onClick?: () => void;
};
export function InfoTitleButton({ title, linkText, btn, link, onClick }: Props) {
    return (
        <VStack alignItems='start' w='full'>
            <Title>{title}</Title>
            <ButtonTransit btn={btn} linkText={linkText} link={link} onClick={onClick} />
        </VStack>
    );
}
