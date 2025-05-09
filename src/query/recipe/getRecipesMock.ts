import type {
    BaseQueryApi,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/query';

import { ResponseParamsOrNull } from '../types';
import { MAS_RECIPES } from './recipe.mock';
import { RecipesResponse } from './recipe.types';

export const getRecipesMock = async (
    _arg: ResponseParamsOrNull,
    _api: BaseQueryApi,
    // _extraOptions: {},
    // _baseQuery: any
): Promise<QueryReturnValue<RecipesResponse, FetchBaseQueryError, FetchBaseQueryMeta>> => {
    try {
        const response = {
            data: MAS_RECIPES.map((recipe) => ({
                ...recipe,
                nutritionValue: {
                    ...recipe.nutritionValue,
                    proteins:
                        recipe.nutritionValue?.proteins ?? recipe.nutritionValue?.protein ?? 0,
                },
            })),
            meta: {
                total: 10,
                page: 1,
                limit: 10,
                totalPages: 1,
            },
        };
        return { data: response };
    } catch (_error) {
        return { error: { status: 'FETCH_ERROR', error: 'Custom error occurred' } };
    }
};
