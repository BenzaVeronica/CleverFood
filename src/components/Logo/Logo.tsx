import { Flex, ResponsiveValue } from '@chakra-ui/react';
import { Link } from 'react-router';

import { TEST_ID } from '~/test/test.constant';

import { LogoIcon } from '../Icons/LogoIcon';
import { LogoText } from '../Icons/LogoText';

type Props = {
    h?: ResponsiveValue<string>;
    withHiding?: boolean;
};
export const Logo = ({ h, withHiding = false }: Props) => (
    <Flex
        data-test-id={TEST_ID.HeaderLogo}
        justifyContent='center'
        alignItems='end'
        px={withHiding ? { base: 5, lg: 4 } : undefined}
        py={withHiding ? { base: 4, lg: 6 } : undefined}
        as={Link}
        to='/'
    >
        <LogoIcon boxSize={h ? h : 8} color='lime.500' />
        <LogoText
            display={{ base: withHiding ? 'none' : 'block', md: 'block' }}
            ml={2}
            width='auto'
            height={h ? h : '25px'}
            color='lime.500'
            secondaryColor='lime.500'
        />
    </Flex>
);
