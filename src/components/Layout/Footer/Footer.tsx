import { Avatar, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { getImagePath } from '~/query/api.constants';
import { useGetUserMeQuery } from '~/query/user/user.api';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { TEST_ID } from '~/test/test.constant';
import { HEIGHT_FOOTER } from '~/theme/ui.constants';

import { IconHomeCircle } from '../../Icons/IconHomeCircle';
import { IconSearchCircle } from '../../Icons/IconSearchCircle';
import { IconWriteCircle } from '../../Icons/IconWriteCircle';
import { FooterMenuItem } from './Footer.types';

export function Footer() {
    const location = useLocation();

    const { data } = useGetUserMeQuery();
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
            dataTestId: TEST_ID.sprint7.footerprofilebutton,
            text: 'Мой профиль',
            link: PageRoutes.PROFILE,
            icon: () => <Avatar boxSize='40px' src={getImagePath(data?.photoLink)} />,
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
                const isActive = location.pathname === el.link || isHovered;
                return (
                    <Flex
                        data-test-id={el?.dataTestId}
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
