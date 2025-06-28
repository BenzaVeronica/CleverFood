import { Box, HStack } from '@chakra-ui/react';

import { BloggerDraft } from '~/query/blogs/blogs.type';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { TEST_ID } from '~/test/test.constant';

import { CardMixedListPaginated } from '../CardList/CardMixedListPaginated';
import CustomTitleWithCount from '../UI/CustomTitleWithCount';

type Props = {
    drafts?: BloggerDraft[];
    recipes?: Recipe[];
};
export function UserProfileTabs({ drafts, recipes }: Props) {
    const recipesCount = recipes?.length ?? 0;
    const draftsCount = drafts?.length ?? 0;

    const allRecipes = [...(drafts ?? []), ...(recipes ?? [])];

    return (
        <Box mt={4} data-test-id={TEST_ID.sprint7.userprofilerecipes}>
            <HStack spacing={8}>
                <CustomTitleWithCount title='Мои рецепты' count={recipesCount} />
                {draftsCount > 0 && <CustomTitleWithCount title='Черновики' count={draftsCount} />}
            </HStack>
            <CardMixedListPaginated mt={6} allRecipes={allRecipes} />
        </Box>
    );
}
