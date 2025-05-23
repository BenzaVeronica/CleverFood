import * as yup from 'yup';

import {
    validatorLogin,
    validatorPassword,
    validatorPasswordRepeat,
} from '~/query/auth/auth.constants';

export const SchemaFormRegistryStep2 = yup.object({
    login: validatorLogin,
    password: validatorPassword,
    passwordRepeat: validatorPasswordRepeat,
});

export type FormDataFormRegistryStep2 = yup.InferType<typeof SchemaFormRegistryStep2>;
export type FormFieldsFormRegistryStep2 = {
    login: string;
    password: string;
    passwordRepeat: string;
};
