import { Button, Flex, Icon } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useMobileMenu } from '~/context/MobileMenuContext';
import { masProfiles } from '~/store/blog/blog.constants';
import { useAuth } from '~/store/user/useAuth';
import useBreakpoints from '~/utils/useBreakpoints';

import IconClose from '../../assets/iconClose.svg?react';
import IconMenu from '../../assets/iconMenu.svg?react';
import { LogoIcon } from '../Icons/LogoIcon';
import { LogoText } from '../Icons/LogoText';
import LeftNavMenu from '../LeftNavMenu';
import LoginButton from '../LoginButton';
import CustomBreadcrumb from '../UI/Breadcrumb';
import UserProfile from '../UserProfile';
import UserStat from '../UserStat';

type Props = {
    // title?: string;
};

function Header(_props: Props) {
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
            <Flex alignItems='end' px={{ base: 5, lg: 4 }} py={{ base: 4, lg: 6 }} as={Link} to='/'>
                <LogoIcon boxSize={8} color='lime.500' />
                <LogoText
                    display={{ base: 'none', md: 'block' }}
                    ml={2}
                    width='auto'
                    height='25px'
                    color='lime.500'
                    secondaryColor='lime.500'
                />
            </Flex>

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
                {/* <Button
                    data-test-id='close-icon'
                    data-test-id='hamburger-icon'
                    onClick={toggleMenu}
                    colorScheme='lime'
                    leftIcon={
                        isOpen ? (
                            <Icon as={IconClose} boxSize={8} color='gray.700' />
                        ) : (
                            <Icon as={IconMenu} boxSize={6} />
                        )
                    }
                    variant='ghost'
                    iconSpacing={0}
                    p={0}
                /> */}
            </Flex>
            {/* {isOpen && <LeftNavMenu />} */}
            {isTablet && isOpen && <LeftNavMenu />}
        </Flex>
    );
}

export default Header;
