import { RecipeFormData } from '~/store/recipe-form/recipe-form-types';

import { ApiGroups } from '../constants/api-group-names';
import { RequestParamsUserId } from '../types';
import { RecipeIdAndRecipe, RecipesResponse } from './recipe.types';

export const TAG_LIST_RECIPE = [{ type: ApiGroups.RECIPE, id: 'LIST' }];

export const providesRecipeTags = (result?: RecipesResponse) =>
    result?.data
        ? [
              ...TAG_LIST_RECIPE,
              ...result.data.map((r) => ({
                  type: ApiGroups.RECIPE,
                  id: r._id,
              })),
          ]
        : TAG_LIST_RECIPE;
export const providesRecipeTagById = (_result: unknown, _error: unknown, id?: string) =>
    id ? [{ type: ApiGroups.RECIPE, id }] : TAG_LIST_RECIPE;

export const providesTagsByUserId = (
    _result: unknown,
    _error: unknown,
    { userId }: RequestParamsUserId,
) =>
    userId
        ? [...TAG_LIST_RECIPE, { type: ApiGroups.RECIPE, id: `USER_${userId}` }]
        : TAG_LIST_RECIPE;

export const invalidateRecipeTags = (
    _result: unknown,
    error: unknown,
    requestParam: RecipeIdAndRecipe,
) => (error ? [] : [...TAG_LIST_RECIPE, { type: ApiGroups.RECIPE, id: requestParam.recipeId }]);

export const invalidateRecipeTagsFromBody = (
    _result: unknown,
    error: unknown,
    obj: { id: string; data: RecipeFormData },
) => (error ? [] : [...TAG_LIST_RECIPE, { type: ApiGroups.RECIPE, id: obj.id }]);

export const invalidateRecipeListTags = (_result: unknown, error: unknown) =>
    error ? [] : TAG_LIST_RECIPE;
