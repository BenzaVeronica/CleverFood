import { Recipe } from '~/store/recipe-filter/recipe.types';

import { ItemResponse } from '../types';

export type RecipesResponse = ItemResponse<Recipe[]>;

export type RecipeLikeResponse = {
    likes: number;
    message: string;
};

export type RecipeBookmarksResponse = {
    bookmarks: number;
    message: string;
};
