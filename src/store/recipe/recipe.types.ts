export type recipeStep = {
    stepNumber: number;
    description: string;
    image?: string | null;
};
export type recipeIngredients = {
    title: string;
    count: string;
    measureUnit: string;
};
export type recipeNutritionValue = {
    calories: number;
    //TODO: заменить
    proteins?: number;
    protein?: number;
    fats: number;
    carbohydrates: number;
};
export type recipe = {
    _id: string;
    createdAt: string;
    title: string;
    description: string;

    time: number;
    image: string;
    likes: number;
    bookmarks: number;
    views: number;

    meat?: string;
    garnish?: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: recipeStep[];
    nutritionValue: recipeNutritionValue;
    ingredients: recipeIngredients[];
};
