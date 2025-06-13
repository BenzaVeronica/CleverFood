import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import errorImage from '~/assets/errorImage.png';
import Logo from '~/components/UI/Logo';

function NotFoundPage() {
    return (
        <Box w='100vw' h='100vh'>
            <Flex w='100%' bg='lime.50' alignItems='center' justifyContent='space-between'>
                <Logo withHiding />
            </Flex>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                flex='1'
                w={{ base: '252px', lg: '332px' }}
                mx='auto'
                mt={{ base: '155px', md: '250px' }}
            >
                <Image src={errorImage} mb={8} w={{ base: '108px', lg: '206px' }} />
                <Text as='h1' fontSize='2xl' fontWeight={600} mb={4} textAlign='center'>
                    Упс! Такой страницы нет
                </Text>
                <Text fontSize='md' color='blackAlpha.700' textAlign='center'>
                    Можете поискать другой рецепт
                    <Link
                        data-test-id='error-page-go-home'
                        to='/'
                        style={{
                            textDecoration: 'underline',
                        }}
                    >
                        {' '}
                        здесь
                    </Link>
                </Text>
            </Box>
        </Box>
    );
}

export default NotFoundPage;
