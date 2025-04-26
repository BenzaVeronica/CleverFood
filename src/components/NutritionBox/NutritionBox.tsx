import { Flex, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    number: number;
    text: string;
};

function NutritionBox(props: Props) {
    return (
        <Flex
            w='100%'
            direction={{ base: 'row', md: 'column' }}
            px={{ base: 3, md: 4 }}
            py={{ base: 4, md: 4 }}
            alignItems='center'
            justifyContent='space-between'
            borderRadius='16px'
            borderWidth='1px'
            border='blackAlpha.200'
        >
            <Text fontSize='sm' color='blackAlpha.600' w={{ base: '50%', md: 'auto' }}>
                {props.title}
            </Text>
            <Text
                fontSize={{ base: '2xl', md: '4xl' }}
                w={{ base: '50%', md: 'auto' }}
                textAlign={{ base: 'center', md: 'left' }}
                color='lime.800'
            >
                {props.number}
            </Text>
            <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                color='blackAlpha.900'
                textTransform='uppercase'
                fontWeight='semibold'
                w={{ base: '61px', md: 'auto' }}
            >
                {props.text}
            </Text>
        </Flex>
    );
}

export default NutritionBox;
