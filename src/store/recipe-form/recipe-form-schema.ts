import * as yup from 'yup';

export const baseSchema = yup.object({
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
export const recipeSchema = baseSchema.shape({
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

export type RecipeSchema = yup.InferType<typeof recipeSchema>;
export type RecipeBaseSchema = yup.InferType<typeof baseSchema>;
