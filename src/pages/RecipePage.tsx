import { Flex, GridItem, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import NewRecipeSlider from '~/components/NewRecipeSlider';
import NutritionBox from '~/components/NutritionBox';
import RecipeDescription from '~/components/RecipeDescription';
import IngridientsTable from '~/components/RecipeIngridientsTable';
import RecipeSteps from '~/components/RecipeSteps';
import { LoaderScreen } from '~/components/UI/Loader/LoaderScreen';
import { UserCardGreen } from '~/components/UserCard/UserCardGreen';
import { useGetBloggerByIdQuery } from '~/query/blogs/blogs.api';
import { useGetRecipeByIdQuery } from '~/query/recipe/recipe.api';
import { useRedirectInvalidPath } from '~/routes/useRedirectInvalidPath';
import { useAuth } from '~/store/auth/useAuth';
import ErrorNotification from '~/widgets/error/ErrorNotification';

function RecipePage() {
    const { categoryId, subcategoryId, recipeId } = useParams();
    useRedirectInvalidPath();

    const { data: currentRecipe, isLoading } = useGetRecipeByIdQuery(recipeId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId, subcategoryId, recipeId]);

    const { user } = useAuth();
    const { data: blogger } = useGetBloggerByIdQuery(
        {
            bloggerId: currentRecipe?.authorId ?? '',
            currentUserId: user?.userId ?? '',
        },
        {
            skip: !user?.userId || !currentRecipe,
        },
    );

    if (isLoading || !currentRecipe) return <LoaderScreen />;
    return (
        <ContainerGridLayout gap={6}>
            <ErrorNotification />
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <RecipeDescription item={currentRecipe} />
            </GridItem>
            <GridItem
                colSpan={{ base: 4, md: 12, lg: 8, xl: 6 }}
                colStart={{ base: 1, lg: 3, xl: 4 }}
                display='flex'
                flexDirection='column'
                gap={{ base: 6, lg: 10 }}
            >
                <Stack>
                    <Text fontSize='sm' color='blackAlpha.800'>
                        * Калорийность на 1 порцию
                    </Text>
                    <Flex
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap={{ base: 4, lg: 4, xl: 6 }}
                        mt={{ base: 3, md: 5 }}
                    >
                        <NutritionBox
                            title='калорийность'
                            number={currentRecipe.nutritionValue.calories}
                            text='ккал'
                        />
                        <NutritionBox
                            title='белки'
                            number={currentRecipe.nutritionValue.proteins!}
                            text='ГРАММ'
                        />
                        <NutritionBox
                            title='жиры'
                            number={currentRecipe.nutritionValue.fats}
                            text='ГРАММ'
                        />
                        <NutritionBox
                            title='углеводы'
                            number={currentRecipe.nutritionValue.carbohydrates}
                            text='ГРАММ'
                        />
                    </Flex>
                </Stack>
                <IngridientsTable item={currentRecipe} />
                <RecipeSteps item={currentRecipe} />
                {blogger && <UserCardGreen profile={blogger} />}
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <NewRecipeSlider />
            </GridItem>
        </ContainerGridLayout>
    );
}

export default RecipePage;
