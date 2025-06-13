import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';

import { useMobileMenu } from '~/context/MobileMenuContext';

type Props = {
    isMobile: boolean;
    children: ReactNode | ReactNode[];
};

export function LeftNavMenuWrapper({ isMobile, children }: Props) {
    const { isOpen, closeMenu } = useMobileMenu();
    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen, isMobile]);
    if (isMobile)
        return (
            <>
                <Box
                    display={{ base: isOpen ? 'block' : 'none', lg: 'none' }}
                    position='fixed'
                    top='64px'
                    left='0'
                    w='100vw'
                    h='100vh'
                    backdropBlur='4px'
                    bg='blackAlpha.300'
                    zIndex={-1}
                    onClick={closeMenu}
                />
                <Flex
                    display={{ base: isOpen ? 'flex' : 'none', lg: 'none' }}
                    data-test-id='nav'
                    flexDirection='column'
                    position='absolute'
                    bg='white'
                    top='64px'
                    height={{ base: '662px', md: '868px' }}
                    right={2}
                    zIndex={14}
                    gap={{ base: 3, lg: 0 }}
                    px={4}
                    pt={6}
                    pb={8}
                    borderRadius='0 0 12px 12px'
                    w='344px'
                >
                    {children}
                </Flex>
            </>
        );
    return (
        <Flex
            data-test-id='nav'
            flexDirection='column'
            height='100%'
            gap={{ base: 3, lg: 0 }}
            justifyContent='space-between'
        >
            {children}
        </Flex>
    );
}
