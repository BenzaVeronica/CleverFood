import { Button, Icon } from '@chakra-ui/react';

import { useAuth } from '~/store/auth/useAuth';

import IconLogin from '../../assets/iconLogin.svg?react';

function LoginButton() {
    const { isAuthenticated } = useAuth();
    const onClickLogin = () => {};
    if (isAuthenticated) return null;
    return (
        <Button
            onClick={onClickLogin}
            rightIcon={<Icon as={IconLogin} />}
            variant='ghost'
            size='sm'
            mr={{ base: 0, lg: 14 }}
        >
            Log in
        </Button>
    );
}

export default LoginButton;
