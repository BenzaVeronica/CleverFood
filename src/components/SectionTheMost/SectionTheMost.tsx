import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { masItems } from '~/store/recipe/recipe.constants';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg?react';
import CardList from '../CardList';

type Props = {
    // title?: string;
};

function SectionTheMost(_props: Props) {
    return (
        <Box as='section'>
            <Flex mb={6} justifyContent='space-between'>
                <Text as='h2' fontSize={['2xl', '2xl', '2xl', '3xl', '4xl']} fontWeight='500'>
                    Самое сочное
                </Text>
                <Button
                    as={Link}
                    to='/the-most'
                    data-test-id='juiciest-link'
                    display={{ base: 'none', md: 'flex' }}
                    rightIcon={<Icon as={ArrowLongRight} />}
                    bg='lime.300'
                    _hover={{
                        bg: 'lime.500',
                        color: 'white',
                        '& path': {
                            fill: 'white',
                        },
                    }}
                    fontSize='lg'
                    fontWeight='semibold'
                >
                    Вся подборка
                </Button>
            </Flex>
            <CardList
                item={{
                    id: 1,
                    title: 'Самое сочное',
                    url: 'the-most',
                }}
                list={masItems.slice(3, 7)}
                mb={{ base: 0, md: 10 }}
            />
            <Button
                as={Link}
                to='/the-most'
                data-test-id='juiciest-link-mobile'
                width='fit-content'
                mx='auto'
                mt={4}
                mb={8}
                display={{ base: 'flex', md: 'none' }}
                rightIcon={<Icon as={ArrowLongRight} />}
                bg='lime.300'
                _hover={{
                    bg: 'lime.500',
                    color: 'white',
                    '& path': {
                        fill: 'white',
                    },
                }}
                fontSize='lg'
                fontWeight='semibold'
            >
                Вся подборка
            </Button>
        </Box>
    );
}

export default SectionTheMost;
