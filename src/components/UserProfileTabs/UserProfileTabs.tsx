import { Box, HStack } from '@chakra-ui/react';

import { MAS_RECIPES } from '~/query/recipe/recipe.mock';

import CardList from '../CardList';
import CustomTitleWithCount from '../UI/CustomTitleWithCount';

export function UserProfileTabs() {
    const recipesCount = 1,
        draftsCount = 1;
    return (
        <Box mt={4}>
            <HStack spacing={8}>
                <CustomTitleWithCount title='Мои рецепты' count={recipesCount} />
                {draftsCount > 0 && <CustomTitleWithCount title='Черновики' count={draftsCount} />}
            </HStack>
            {draftsCount > 0 && (
                <CardList list={MAS_RECIPES.slice(0, 4)} withButton={false} mt={3} />
            )}
            <CardList list={MAS_RECIPES.slice(0, 4)} withButton={false} mt={3} />
        </Box>
    );
}
