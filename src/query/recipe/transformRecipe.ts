import { Recipe } from '~/store/recipe-filter/recipe.types';

import { RecipesResponse } from './recipe.types';

// NOTE: убрать
export const transformRecipesProteinsResponse = (response: RecipesResponse) => {
    const transformedRecipes = Array.isArray(response?.data)
        ? response.data.map((recipe: Recipe) => ({
              ...recipe,
              nutritionValue: {
                  ...recipe.nutritionValue,
                  proteins: recipe.nutritionValue?.proteins ?? recipe.nutritionValue?.protein ?? 0,
                  protein: undefined,
              },
          }))
        : [];

    return {
        ...response,
        data: transformedRecipes,
    };
};

export const transformRecipeProteinsResponse = (recipe: Recipe) => ({
    ...recipe,
    nutritionValue: {
        ...recipe.nutritionValue,
        proteins: recipe.nutritionValue?.proteins ?? recipe.nutritionValue?.protein ?? 0,
        protein: undefined,
    },
});
