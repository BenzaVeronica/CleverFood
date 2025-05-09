import { Avatar, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router';

import { masProfiles } from '~/store/blog/blog.constants';

import { IconHomeCircle } from '../../Icons/IconHomeCircle';
import { IconSearchCircle } from '../../Icons/IconSearchCircle';
import { IconWriteCircle } from '../../Icons/IconWriteCircle';
import { FooterMenuItem } from './Footer.types';

type Props = {
    // title?: string;
};

function Footer(_props: Props) {
    const location = useLocation();

    const mas: FooterMenuItem[] = [
        {
            text: 'Главная',
            link: '/',
            icon: (props) => <IconHomeCircle {...props} />,
        },
        {
            text: 'Поиск',
            link: '/search',
            icon: (props) => <IconSearchCircle {...props} />,
        },
        {
            text: 'Записать',
            link: '/write',
            icon: (props) => <IconWriteCircle {...props} />,
        },
        {
            text: 'Мой профиль',
            link: '/profile',
            icon: () => <Avatar boxSize='40px' src={masProfiles[0].img} />,
        },
    ];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <SimpleGrid
            as='footer'
            data-test-id='footer'
            columns={4}
            bg='lime.50'
            position='fixed'
            bottom='0'
            left='0'
            right='0'
            height='84px'
            display={{ base: 'grid', lg: 'none' }}
            zIndex={7}
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
                        <Text fontSize='xs'>{el.text}</Text>
                    </Flex>
                );
            })}
        </SimpleGrid>
    );
}

export default Footer;
