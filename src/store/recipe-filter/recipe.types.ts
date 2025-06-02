import { MongoEntity } from '~/query/types';

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image?: string | null;
};
export type RecipeIngredients = {
    title: string;
    count: number;
    measureUnit: string;
};
export type RecipeNutritionValue = {
    calories: number;
    fats: number;
    carbohydrates: number;
    //TODO: заменить
    proteins?: number;
    protein?: number;
};
export type RecipeStat = {
    likes: number;
    bookmarks: number;
    views: number;
};

export type Recipe = MongoEntity &
    RecipeStat & {
        categoriesIds: string[];
        image: string;
        title: string;
        description: string;
        portions: number;
        time: number;
        ingredients: RecipeIngredients[];
        steps: RecipeStep[];

        authorId: string;
        nutritionValue: RecipeNutritionValue;
        meat?: string;
        garnish?: string;
    };
