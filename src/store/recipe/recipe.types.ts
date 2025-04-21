import { profile } from '../blog/blog.types';

export type recipeStep = {
    stepNumber: number;
    description: string;
    image: string | null;
};
export type recipeIngredients = {
    title: string;
    count: string;
    measureUnit: string;
};
export type recipeNutritionValue = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};
export type recipe = {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: recipeNutritionValue;
    ingredients: recipeIngredients[];
    steps: recipeStep[];
    meat?: string;
    side?: string;
    recommend?: profile;
};
