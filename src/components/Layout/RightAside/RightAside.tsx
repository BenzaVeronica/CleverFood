import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { PageRoutes } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';
import { HEIGHT_HEADER, WIDTH_RIGHT_ASIDE } from '~/theme/ui.constants';

import { IconWriteCircle } from '../../Icons/IconWriteCircle';
import UserStat from '../../UserStat';

export function RightAside() {
    const { isAuthenticated } = useAuth();

    const currentPath = window.location.pathname;
    const isHide =
        !isAuthenticated ||
        currentPath.includes(PageRoutes.RECIPE_CREATE) ||
        currentPath.includes(PageRoutes.RECIPE_EDIT);

    if (isHide) return null;
    return (
        <Flex
            flexDirection='column'
            justifyContent='space-between'
            h={`calc(100vh - ${HEIGHT_HEADER})`}
        >
            <UserStat
                flexProps={{
                    flexDirection: { base: 'row', lg: 'column' },
                    pt: { base: 0, lg: 4 },
                    px: { base: 0, lg: 12 },
                    gap: { base: 0, lg: 6 },
                }}
            />
            <Flex
                data-test-id={TEST_ID.Recipe.AddRecipeButton}
                h={WIDTH_RIGHT_ASIDE}
                bg='limeGradient.70'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
                as={Link}
                to={PageRoutes.RECIPE_CREATE}
            >
                <IconWriteCircle isActive boxSize={12} mb={3} />
                <Text fontSize='12px' lineHeight='16px' color='blackAlpha.700'>
                    Записать рецепт
                </Text>
            </Flex>
        </Flex>
    );
}
