import { Flex, GridItem, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import CardUser from '~/components/Card/CardUser';
import IngridientsTable from '~/components/IngridientsTable';
import NewRecipeSlider from '~/components/NewRecipeSlider';
import NutritionBox from '~/components/NutritionBox';
import RecipeDescription from '~/components/RecipeDescription';
import RecipeSteps from '~/components/RecipeSteps';
import { masProfiles } from '~/store/blog/blog.constants';
import { MAS_RECIPES } from '~/store/recipe/recipe.constants';
import { recipe } from '~/store/recipe/recipe.types';

function RecipePage() {
    const { categoryId, subcategoryId, recipeId } = useParams();

    const [currentRecipe, setCurrentRecipe] = useState<recipe | null>(
        MAS_RECIPES.find((el) => el.id == recipeId) || null,
    );
    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentRecipe(MAS_RECIPES.find((el) => el.id == recipeId) || null);
    }, [categoryId, subcategoryId, recipeId]);

    if (!currentRecipe) return null;
    return (
        <ContainerGridLayout gap={6}>
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
                            number={currentRecipe.nutritionValue.proteins}
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
                <CardUser profile={masProfiles[4]} />
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <NewRecipeSlider />
            </GridItem>
        </ContainerGridLayout>
    );
}

export default RecipePage;
