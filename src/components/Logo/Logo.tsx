import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router';

import { LogoIcon } from '../Icons/LogoIcon';
import { LogoText } from '../Icons/LogoText';

export const Logo = () => (
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
);
