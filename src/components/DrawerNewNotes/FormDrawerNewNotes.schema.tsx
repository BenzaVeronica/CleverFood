import * as yup from 'yup';

export const noteSchema = yup.object({
    text: yup
        .string()
        .required('Поле обязательно для заполнения')
        .min(10, 'Минимум 10 символов')
        .max(160, 'Максимум 160 символов'),
});
