import { Avatar, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { PageRoutes } from '~/routes/PageRoutes.constants';
import { masProfiles } from '~/store/blog/blog.constants';
import { HEIGHT_FOOTER } from '~/theme/ui.constants';

import { IconHomeCircle } from '../../Icons/IconHomeCircle';
import { IconSearchCircle } from '../../Icons/IconSearchCircle';
import { IconWriteCircle } from '../../Icons/IconWriteCircle';
import { FooterMenuItem } from './Footer.types';

function Footer() {
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
            link: PageRoutes.RECIPE_CREATE,
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
            height={HEIGHT_FOOTER}
            display={{ base: 'grid', lg: 'none' }}
            zIndex={7}
        >
            {mas.map((el, index) => {
                const isHovered = hoveredIndex === index;
                const isActive = location.pathname.startsWith(el.link) || isHovered;
                return (
                    <Flex
                        as={Link}
                        to={el.link}
                        bg={isActive ? 'limeGradient.70' : ''}
                        key={`Footer_${el.text}${index}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        transition='background-color 0.2s'
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
