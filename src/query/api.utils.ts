// import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { recipe } from '~/store/recipe/recipe.types';

import { ErrorStatusMap, ErrorStringStatusMap } from './error.constants';
import { RecipesResponse } from './recipe/recipe.types';
import { CustomErrorResponse } from './types';

export const isCustomErrorResponse = (error: unknown): error is CustomErrorResponse =>
    !!error && typeof error === 'object' && 'status' in error;

export const transformErrorResponse = (response: FetchBaseQueryError) => {
    if (!response) return;
    const error: CustomErrorResponse = {
        status: response.status,
        title: 'Ошибка',
        message: typeof response.data === 'string' ? response.data : '',
    };
    if (typeof response.status === 'number') {
        error.title = ErrorStatusMap[response.status] || ErrorStatusMap[0];
        // if (response.status === 401) {
        //     store.dispatch(logout());
        // }
    } else {
        error.title = ErrorStringStatusMap[response.status];
    }
    return error;
};

export const transformRecipesProteinsResponse = (response: RecipesResponse) => {
    const transformedRecipes = Array.isArray(response?.data)
        ? response.data.map((recipe: recipe) => ({
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

export const transformRecipeProteinsResponse = (recipe: recipe) => ({
    ...recipe,
    nutritionValue: {
        ...recipe.nutritionValue,
        proteins: recipe.nutritionValue?.proteins ?? recipe.nutritionValue?.protein ?? 0,
        protein: undefined,
    },
});
