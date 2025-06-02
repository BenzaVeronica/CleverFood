import * as yup from 'yup';

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
// export type RecipeFormDataDraft = Nullable<RecipeFormData> & { title: string };

export type RecipeSchema = yup.InferType<typeof recipeSchema>;
export type RecipeBaseSchema = yup.InferType<typeof baseSchema>;

const baseSchema = yup.object({
    categoriesIds: yup.array().nullable(),
    title: yup.string().required('Обязательное поле').trim(),
    description: yup.string().nullable(),
    image: yup.string().nullable(),
    time: yup.number().nullable(),
    portions: yup.number().nullable(),
    ingredients: yup.array().of(
        yup.object({
            title: yup.string().nullable(),
            count: yup.number().nullable(),
            measureUnit: yup.string().nullable(),
        }),
    ),
    steps: yup.array().of(
        yup.object({
            stepNumber: yup.number().nullable(),
            description: yup.string().nullable(),
            image: yup.string().nullable(),
        }),
    ),
});
const recipeSchema = baseSchema.shape({
    categoriesIds: yup
        .array()
        .of(yup.string())
        .min(3, 'Выберите минимум 3 категории')
        .required('Обязательное поле'),
    title: yup.string().required('Обязательное поле').trim().max(50, 'Максимум 50 символов'),
    description: yup
        .string()
        .required('Обязательное поле')
        .trim()
        .max(500, 'Максимум 500 символов'),
    image: yup.string().required('Добавьте изображение'),
    time: yup
        .number()
        .required('Обязательное поле')
        .min(1, 'Минимум 1 минута')
        .max(10000, 'Максимум 10000 минут'),
    portions: yup.number().required('Обязательное поле').min(1, 'Минимум 1 порция'),
    ingredients: yup
        .array()
        .of(
            yup.object({
                title: yup.string().required('Укажите ингредиент').max(50, 'Максимум 50 символов'),
                count: yup
                    .number()
                    .typeError('Количество должно быть числом')
                    .required('Укажите количество')
                    .positive('Количество должно быть положительным'),
                measureUnit: yup.string().required('Укажите единицу измерения'),
            }),
        )
        .required('Обязательное поле'),
    steps: yup
        .array()
        .of(
            yup.object({
                stepNumber: yup.number(),
                description: yup
                    .string()
                    .required('Описание шага обязательно')
                    .max(300, 'Максимум 300 символов'),
                image: yup.string().nullable(),
            }),
        )
        .required('Обязательное поле'),
});

export { baseSchema, recipeSchema };

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
    // image?: string;
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
