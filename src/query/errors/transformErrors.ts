import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { Recipe } from '~/store/recipe-filter/recipe.types';

import { RecipesResponse } from '../recipe/recipe.types';
import { CustomErrorResponse, ResponseData } from '../types';
import { ErrorDescEnum, ErrorStatusMap, ErrorStringStatusMap } from './error.constants';
import { checkStatusIsNumber, isServerError } from './error.utils';

export const transformErrorResponse = (response: FetchBaseQueryError) => {
    if (!response) return;
    const error: CustomErrorResponse = {
        status: response.status,
        title: 'Ошибка',
        message: typeof response.data === 'string' ? response.data : '',
    };
    if (checkStatusIsNumber(response.status)) {
        if (isServerError(response.status)) {
            error.title = ErrorStatusMap[500];
            error.message = ErrorDescEnum.LATER;
        } else {
            error.title = ErrorStatusMap[response.status] || ErrorStatusMap[0];
        }
    } else {
        error.title = ErrorStringStatusMap[response.status];
    }
    return error;
};

export const transformErrorWithMessageResponse = (response: FetchBaseQueryError) => {
    if (!response) return;
    const data = response.data as ResponseData;
    const error: CustomErrorResponse = {
        status: response.status,
        title: data?.message,
        message: '',
    };
    if (isServerError(error.status)) {
        error.title = ErrorStatusMap[500];
        error.message = ErrorDescEnum.LATER;
    }
    return error;
};

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
