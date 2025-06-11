import { HStack, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    count: number;
    dataTestId?: string;
};

export function CustomTitleWithCount({ title, count, dataTestId }: Props) {
    return (
        <HStack spacing={2}>
            <Text fontSize='4xl'>{title}</Text>
            <Text fontSize='3xl' color='blackAlpha.600' data-test-id={dataTestId && dataTestId}>
                ({count})
            </Text>
        </HStack>
    );
}
