import { Recipe } from '~/store/recipe-filter/recipe.types';

import { BloggerNote } from '../blogs/blogs.type';
import { ItemResponse } from '../types';

export type RecipesResponse = ItemResponse<Recipe[]>;

export type RecipeLikeResponse = {
    likes: number;
    message: string;
};

export type RecipeBookmarksResponse = {
    count: number;
    message: string;
};

export type RecipesByUserIdResponse = {
    recipes: Recipe[];
    myBookmarks: Recipe[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
    notes: BloggerNote[];
};

export type RecipeIdAndRecipe = {
    recipeId: string;
    recipe: Recipe;
};
