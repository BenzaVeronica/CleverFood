import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { Recipe } from '~/store/recipe-filter/recipe.types';

import { RecipesResponse } from '../recipe/recipe.types';
import { ResponseData } from '../types';
import { ErrorStringStatusMap, TOAST_MESSAGE } from './error.constants';
import { CustomErrorResponse } from './error.type';
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
            error.title = TOAST_MESSAGE.ServerErrorToast.title;
            error.message = TOAST_MESSAGE.ServerErrorToast.description;
        } else {
            error.title = TOAST_MESSAGE.ClientErrorToast.title;
            error.message = TOAST_MESSAGE.ClientErrorToast.description;
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
        error.title = TOAST_MESSAGE.ServerErrorToast.title;
        error.message = TOAST_MESSAGE.ServerErrorToast.description;
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
