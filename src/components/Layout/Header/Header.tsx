import { Button, Flex, Icon } from '@chakra-ui/react';

import IconClose from '~/assets/iconClose.svg?react';
import IconMenu from '~/assets/iconMenu.svg?react';
import LeftNavMenu from '~/components/Layout/LeftNavMenu';
import LoginButton from '~/components/LoginButton';
import Logo from '~/components/Logo';
import CustomBreadcrumb from '~/components/UI/Breadcrumb';
import UserProfile from '~/components/UserProfile';
import UserStat from '~/components/UserStat';
import { useMobileMenu } from '~/context/MobileMenuContext';
import { masProfiles } from '~/store/blog/blog.constants';
import { useAuth } from '~/store/user/useAuth';
import useBreakpoints from '~/utils/useBreakpoints';

function Header() {
    const { isTablet } = useBreakpoints();
    const { isAuthenticated } = useAuth();
    const { isOpen, toggleMenu } = useMobileMenu();
    return (
        <Flex
            data-test-id='header'
            position='fixed'
            top={0}
            left={0}
            zIndex={10}
            w='100%'
            bg={isOpen ? 'white' : 'lime.50'}
            alignItems='center'
            justifyContent='space-between'
        >
            <Logo />

            {!isTablet && <CustomBreadcrumb />}

            {isAuthenticated && !isTablet ? (
                <UserProfile profile={masProfiles[0]} showOnMobile={false} mr={14} w='432px' />
            ) : (
                <LoginButton />
            )}
            <Flex mr={5} alignItems='center' display={{ base: 'flex', lg: 'none' }}>
                {isAuthenticated && !isOpen ? <UserStat /> : <LoginButton />}
                {isOpen ? (
                    <Button
                        data-test-id='close-icon'
                        onClick={toggleMenu}
                        colorScheme='lime'
                        leftIcon={<Icon as={IconClose} boxSize={8} color='gray.700' />}
                        variant='ghost'
                        iconSpacing={0}
                        p={0}
                    />
                ) : (
                    <Button
                        data-test-id='hamburger-icon'
                        onClick={toggleMenu}
                        colorScheme='lime'
                        leftIcon={<Icon as={IconMenu} boxSize={6} />}
                        variant='ghost'
                        iconSpacing={0}
                        p={0}
                    />
                )}
            </Flex>
            {isTablet && isOpen && <LeftNavMenu />}
        </Flex>
    );
}

export default Header;
