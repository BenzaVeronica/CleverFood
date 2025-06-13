import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

type Props = {
    color: string;
    text: string;
    leftElement?: React.ReactNode;
    to?: string;
} & FlexProps;

export function CustomTag({ color, text, to, leftElement, ...flexProps }: Props) {
    return (
        <Flex
            as={to ? Link : 'div'}
            to={to}
            bg={color}
            borderRadius='8px'
            px={2}
            py={1}
            gap={2}
            h='fit-content'
            alignItems='center'
            {...flexProps}
        >
            {leftElement}
            <Text fontSize='sm' isTruncated>
                {text}
            </Text>
        </Flex>
    );
}
