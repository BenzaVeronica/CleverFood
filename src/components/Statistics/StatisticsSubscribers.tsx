import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import { ElementType } from 'react';

type Props = {
    icon: ElementType;
    children: React.ReactNode;
} & StackProps;

export function StatisticsSubscribers({ icon, children, ...rest }: Props) {
    return (
        <HStack p={1} spacing='6px' {...rest}>
            <Icon as={icon} boxSize={3} />
            <Text fontSize='xs' color='lime.600'>
                {children}
            </Text>
        </HStack>
    );
}
