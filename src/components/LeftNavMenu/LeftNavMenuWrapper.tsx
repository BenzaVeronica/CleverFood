import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';

import { useMobileMenu } from '~/context/MobileMenuContext';

type Props = {
    isMobile: boolean;
    children: ReactNode | ReactNode[];
};

function LeftNavMenuWrapper({ isMobile, children }: Props) {
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
                {isOpen && (
                    <Box
                        display={{ base: 'block', lg: 'none' }}
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
                )}
                <Flex
                    display={{ base: 'flex', lg: 'none' }}
                    data-test-id='nav'
                    flexDirection='column'
                    position='absolute'
                    bg='red'
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
                {/* <Flex
                display={{ base: 'none', lg: 'flex' }}
                flexDirection='column'
                height='100%'
                gap={{ base: 3, lg: 0 }}
                justifyContent='space-between'
            >
                {children}
            </Flex> */}
            </>
        );
    return (
        <Flex
            flexDirection='column'
            height='100%'
            gap={{ base: 3, lg: 0 }}
            justifyContent='space-between'
        >
            {children}
        </Flex>
    );
}

export default LeftNavMenuWrapper;
