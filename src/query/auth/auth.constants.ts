import * as yup from 'yup';

const PatternLoginPassword = /^[A-Za-z0-9!@#$&_+\-.]+$/;
const PatternRequiredPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const PatternOnlyCyrillicAndDash = /^[А-Яа-я-]+$/u;
const PatternStartsWithCyrillic = /^[А-Яа-я]/u;

const PatternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validatorFirstName = yup
    .string()
    .trim()
    .required('Введите имя')
    .matches(PatternStartsWithCyrillic, 'Должно начинаться с кириллицы А-Я')
    .matches(PatternOnlyCyrillicAndDash, 'Только кириллица А-Я, и "-"')
    .max(50, 'Максимальная длина 50 символов');
export const validatorLastName = yup
    .string()
    .trim()
    .required('Введите фамилию')
    .matches(PatternStartsWithCyrillic, 'Должно начинаться с кириллицы А-Я')
    .matches(PatternOnlyCyrillicAndDash, 'Только кириллица А-Я, и "-"')
    .max(50, 'Максимальная длина 50 символов');

export const validatorEmail = yup
    .string()
    .trim()
    .required('Введите e-mail')
    .max(50, 'Максимальная длина 50 символов')
    .matches(PatternEmail, 'Введите корректный e-mail (например, example@mail.ru)');

export const validatorLogin = yup
    .string()
    .trim()
    .required('Введите логин')
    .min(5, 'Не соответствует формату')
    .max(50, 'Максимальная длина 50 символов')
    .matches(PatternLoginPassword, 'Не соответствует формату');

export const validatorPassword = yup
    .string()
    .required('Введите пароль')
    .min(8, 'Не соответствует формату')
    .max(50, 'Максимальная длина 50 символов')
    .matches(PatternRequiredPassword, 'Не соответствует формату')
    .matches(PatternLoginPassword, 'Не соответствует формату');

export const validatorPasswordRepeat = yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Введите пароль');
