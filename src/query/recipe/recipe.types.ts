import { recipe } from '~/store/recipe/recipe.types';

import { ItemResponse } from '../types';

export type RecipesResponse = ItemResponse<recipe[]>;
