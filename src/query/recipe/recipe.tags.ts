import { RecipeFormData } from '~/store/recipe-form/recipe-form-types';

import { Tags } from '../constants/tags';
import { RecipesResponse } from './recipe.types';

export const LIST_TAG = [{ type: Tags.RECIPE as const, id: 'LIST' }];

export const providesRecipeTags = (result?: RecipesResponse) =>
    result?.data
        ? [
              ...LIST_TAG,
              ...result.data.map((r) => ({
                  type: Tags.RECIPE as const,
                  id: r._id,
              })),
          ]
        : LIST_TAG;
export const providesRecipeTagById = (_result: unknown, _error: unknown, id?: string) =>
    id ? [{ type: Tags.RECIPE as const, id }] : [{ type: Tags.RECIPE as const, id: 'LIST' }];

export const invalidateRecipeTags = (_result: unknown, error: unknown, id: string) =>
    error ? [] : [...LIST_TAG, { type: Tags.RECIPE as const, id }];

export const invalidateRecipeTagsFromBody = (
    _result: unknown,
    error: unknown,
    obj: { id: string; data: RecipeFormData },
) => (error ? [] : [...LIST_TAG, { type: Tags.RECIPE as const, id: obj.id }]);

export const invalidateRecipeListTags = (_result: unknown, error: unknown) =>
    error ? [] : LIST_TAG;
