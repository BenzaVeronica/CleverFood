import { Box, GridItem, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import errorImage from '~/assets/errorImage.png';

type Props = {
    status?: number;
    msg?: string;
};
function ErrorPage(_props: Props) {
    return (
        <ContainerGridLayout>
            <GridItem
                colSpan={{ base: 4, md: 12 }}
                h={{ base: 'calc(100vh - 64px )', lg: 'calc(100vh - 80px)' }}
            >
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
                    <Text fontSize='2xl' fontWeight={600} mb={4}>
                        Упс! Такой страницы нет
                    </Text>
                    <Text fontSize='md' color='blackAlpha.700'>
                        Можете поискать другой рецепт
                        <Link to='/home'>здесь</Link>
                    </Text>
                </Box>
            </GridItem>
        </ContainerGridLayout>
    );
}

export default ErrorPage;
