import { RecipeStep } from '~/store/recipe-filter/recipe.types';

export type RecipeFormSubmitType = 'draft' | 'publish';

export type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

type RecipeIngredients = {
    title: string | null;
    count: number | null;
    measureUnit: string | null;
};

export type RecipeFormData = {
    title: string;
    description: string;
    image: string;
    time: number;
    categoriesIds: string[];
    portions: number;
    steps: Nullable<RecipeStep>[];
    ingredients: Nullable<RecipeIngredients>[];
};
export type RecipeFormDataDraft = {
    title: string;
    categoriesIds: string[];
} & Nullable<Omit<RecipeFormData, 'title' | 'categoriesIds'>>;
export type DraftWithId = RecipeFormDataDraft & { _id: string };

export type onChangeNewIngredient = (
    field: keyof RecipeIngredients | 'submit',
    value: string | number | null,
) => void;
export type onChangeIndexIngredient = (
    index: number,
    field: keyof RecipeIngredients | 'submit',
    value: string | number | null,
) => void;

export type StepError = {
    stepNumber?: string;
    description?: string;
};
export type IngredientError = {
    title?: string;
    count?: string;
    measureUnit?: string;
};
export type RecipeFormErrorsType = {
    title?: string;
    description?: string;
    image?: string;
    time?: string;
    categoriesIds?: string;
    portions?: string;
    steps?: StepError[];
    ingredients?: IngredientError[];
};

export type ArrayFieldKeys = 'steps' | 'ingredients';
export type ArrayItemType = RecipeStep | RecipeIngredients;
export type HandleArrayItemFieldChange = (
    arrayField: ArrayFieldKeys,
    index: number,
    itemField: string,
    value: unknown,
) => void;
