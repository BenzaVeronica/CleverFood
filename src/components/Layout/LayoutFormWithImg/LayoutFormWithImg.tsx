import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import bg from '~/assets/authBg.jpg';

type Props = {
    children: ReactNode;
    img?: string;
};

export function LayoutFormWithImg({ children, img = bg }: Props) {
    return (
        <Box
            w='100vw'
            h='100vh'
            overflow='hidden'
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '200%',
                height: '100%',
                background: 'linear-gradient(208deg, #eaffc7 0%, #29813f 100%)',
                zIndex: 0,
                transform: { base: 'translateX(-50%)', lg: 'translateX(-75%)' },
            }}
        >
            <Flex h='100vh' zIndex={10} position='relative' justifyContent='space-between'>
                <Flex
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    pb={{ base: '82px', lg: '138px' }}
                    w='50%'
                    flex='1'
                >
                    <Box
                        w={{ base: '328px', md: '355px', lg: '456px', xl: '461px' }}
                        // ml={{ base: 'auto', lg: '130px', xl: '256px' }}
                        // mr='auto'
                        // mt={{ base: '72px', md: '140px', lg: '170px' }}
                    >
                        {children}
                    </Box>
                </Flex>
                <Box
                    display={{ base: 'none', lg: 'block' }}
                    w='50%'
                    // w={{ lg: '732px', xl: '978px' }}
                    h='100vh'
                >
                    <Image src={img} alt='AuthBg' w='100%' h='100%' objectFit='cover' />
                </Box>
            </Flex>
            <Flex position='absolute' bottom={0} p={5} justifyContent='space-between' w='100%'>
                <Text fontSize='xs' fontWeight='600' p={{ base: 3, lg: 10 }}>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Text
                    fontSize='xs'
                    fontWeight='600'
                    p={10}
                    pl={0}
                    display={{ base: 'none', lg: 'block' }}
                >
                    ̶&nbsp; Лучший сервис для ваших кулинарных побед
                </Text>
            </Flex>
        </Box>
    );
}
