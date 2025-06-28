import { Button, Flex, Icon } from '@chakra-ui/react';
import { Link } from 'react-router';

import IconClose from '~/assets/iconClose.svg?react';
import IconMenu from '~/assets/iconMenu.svg?react';
import LeftNavMenu from '~/components/Layout/LeftNavMenu';
import LoginButton from '~/components/LoginButton';
import Logo from '~/components/UI/Logo';
import UserProfile from '~/components/UserProfile';
import UserStat from '~/components/UserStat';
import { useMobileMenu } from '~/context/MobileMenuContext';
import { useGetUserMeQuery } from '~/query/user/user.api';
import CustomBreadcrumb from '~/routes/Breadcrumb';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';
import useBreakpoints from '~/utils/useBreakpoints';

export function Header() {
    const { isSmallDesktop } = useBreakpoints();
    const { isAuthenticated } = useAuth();
    const { isOpen, toggleMenu } = useMobileMenu();

    const { data } = useGetUserMeQuery();

    const buttonTestId = isOpen ? 'close-icon' : 'hamburger-icon';
    const ButtonIcon = isOpen ? (
        <Icon as={IconClose} boxSize={8} color='gray.700' />
    ) : (
        <Icon as={IconMenu} boxSize={6} />
    );

    return (
        <Flex
            data-test-id='header'
            position='fixed'
            top={0}
            left={0}
            zIndex={31}
            w='100%'
            bg={isOpen && isSmallDesktop ? 'white' : 'lime.50'}
            alignItems='center'
            justifyContent='space-between'
        >
            <Logo withHiding />

            {!isSmallDesktop && (
                <CustomBreadcrumb
                    breadcrumbProps={{
                        display: { base: 'none', lg: 'inline' },
                        flex: { base: 'none', lg: '1' },
                    }}
                />
            )}

            {isAuthenticated && !isSmallDesktop ? (
                <Link to={PageRoutes.PROFILE} data-test-id={TEST_ID.sprint7.headerprofilebutton}>
                    <UserProfile profile={data} mr={14} maxW='432px' />
                </Link>
            ) : (
                <LoginButton />
            )}
            <Flex
                mr={5}
                alignItems='center'
                style={{
                    visibility: isSmallDesktop ? 'visible' : 'hidden',
                    width: isSmallDesktop ? 'auto' : '0px',
                }}
                // display={{ base: 'flex', lg: 'none' }}
            >
                {isAuthenticated && !isOpen && isSmallDesktop ? <UserStat /> : <LoginButton />}
                <Button
                    data-test-id={buttonTestId}
                    onClick={toggleMenu}
                    colorScheme='lime'
                    leftIcon={ButtonIcon}
                    variant='ghost'
                    iconSpacing={0}
                    p={0}
                />
            </Flex>
            {isSmallDesktop && isOpen && <LeftNavMenu />}
        </Flex>
    );
}
