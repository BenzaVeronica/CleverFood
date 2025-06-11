import { Recipe } from '~/store/recipe-filter/recipe.types';

import { BloggerNote } from '../blogs/blogs.type';
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

export type RecipesByUserIdResponse = {
    data: [];
    notes: BloggerNote[];
    recipes: Recipe[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
};
