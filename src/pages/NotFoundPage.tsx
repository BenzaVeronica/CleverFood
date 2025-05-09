import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import errorImage from '~/assets/errorImage.png';
import Logo from '~/components/Logo';

type Props = {
    status?: number;
    msg?: string;
};
function NotFoundPage(_props: Props) {
    return (
        <Box w='100vw' h='100vh'>
            <Flex w='100%' bg='lime.50' alignItems='center' justifyContent='space-between'>
                <Logo />
            </Flex>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                flex='1'
                w={{ base: '316px', lg: '396px' }}
                mx='auto'
                mt={{ base: '155px', lg: '250px' }}
            >
                <Image src={errorImage} mb={8} />
                <Text as='h1' fontSize='2xl' fontWeight={600} mb={4}>
                    Упс! Такой страницы нет
                </Text>
                <Text fontSize='md' color='blackAlpha.700'>
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
