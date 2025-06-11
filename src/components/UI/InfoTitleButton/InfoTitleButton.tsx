import { VStack } from '@chakra-ui/react';

import ButtonTransit from '../ButtonTransit';
import Title from '../Title';

type Props = {
    title: string;
    btn: string;
    link?: string;
    linkText?: string;
};
export function InfoTitleButton({ title, linkText, link, btn }: Props) {
    return (
        <VStack alignItems='start' w='full'>
            <Title>{title}</Title>
            <ButtonTransit btn={btn} linkText={linkText} link={link} />
        </VStack>
    );
}
