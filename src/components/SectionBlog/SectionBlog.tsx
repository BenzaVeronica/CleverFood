import { Box, Button, Flex, Grid, Icon, Text } from '@chakra-ui/react';

import { masBlogItems } from '~/store/blog/blog.constants';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg?react';
import Article from '../Article';

function SectionBlog() {
    return (
        <Box as='section' bg='lime.300' borderRadius='16px' p={{ base: 3, lg: 6 }}>
            <Flex mb={6} justifyContent='space-between'>
                <Text
                    as='h2'
                    fontSize={['2xl', '2xl', '2xl', '3xl', '4xl']}
                    fontWeight={{ base: 500, lg: 400 }}
                >
                    Кулинарные блоги
                </Text>
                <Button
                    display={{ base: 'none', lg: 'flex' }}
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
                    Все авторы
                </Button>
            </Flex>
            <Grid
                templateColumns={{
                    base: 'repeat(4, 1fr)',
                    md: 'repeat(12, 1fr)',
                }}
                gap={{ base: 3, lg: 4 }}
            >
                {masBlogItems.map((el) => (
                    <Article item={el} key={`SectionBlog_${el.id}`} />
                ))}
            </Grid>

            <Button
                mx='auto'
                mt={3}
                display={{ base: 'flex', lg: 'none' }}
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
                Все авторы
            </Button>
        </Box>
    );
}

export default SectionBlog;
