import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
export function Title({ children }: Props) {
    return (
        <Text fontSize='lg' fontWeight={700} mb={4}>
            {children}
        </Text>
    );
}
