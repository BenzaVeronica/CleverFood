import { Flex, FlexProps, Text } from '@chakra-ui/react';

type Props = {
    color: string;
    text: string;
    leftElement?: React.ReactNode;
} & FlexProps;

function Tag({ color, text, leftElement, ...flexProps }: Props) {
    return (
        <Flex
            as='button'
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
            <Text fontSize='sm'>{text}</Text>
        </Flex>
    );
}

export default Tag;
