import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { IconHomeCircle } from '../Icons/IconHomeCircle';
import { IconWriteCircle } from '../Icons/IconWriteCircle';
import { FooterMenuItem } from './Footer.types';

type Props = {
    // title?: string;
};

function Footer(_props: Props) {
    const location = useLocation();
    console.log(location);

    const mas: FooterMenuItem[] = [
        {
            text: 'Главная',
            link: '/the-most',
            icon: (props) => <IconWriteCircle {...props} />,
        },
        {
            text: 'Поиск',
            link: '/search',
            icon: (props) => <IconHomeCircle {...props} />,
        },
        {
            text: 'Записать',
            link: '/write',
            icon: (props) => <IconWriteCircle {...props} />,
        },
        {
            text: 'Мой профиль',
            link: '/profile',
            icon: (props) => <IconHomeCircle {...props} />,
        },
    ];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <Box
            data-test-id='footer'
            bg='lime.50'
            position='fixed'
            bottom='0'
            left='0'
            right='0'
            height='24'
            display={{ base: 'block', md: 'none' }}
        >
            <SimpleGrid
                // columns={[4, 12]}
                columns={4}
                // columns={{ base: 4, sm: 12 }}
                width='100%'
                height='100%'
            >
                {mas.map((el, index) => {
                    const isHovered = hoveredIndex === index;
                    const isActive = location.pathname.startsWith(el.link) || isHovered;
                    return (
                        <Flex
                            bg={isActive ? 'limeGradient.70' : ''}
                            key={`Footer_${el.text}${index}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            transition='background-color 0.2s'
                            _hover={{ bg: 'lime.500' }}
                            cursor='pointer'
                            direction='column'
                            alignItems='center'
                            justifyContent='center'
                            gap={1}
                        >
                            {el.icon({ isActive: isActive, boxSize: 10 })}
                            <Text>{el.text}</Text>
                        </Flex>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}

export default Footer;
