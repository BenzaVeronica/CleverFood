import * as yup from 'yup';

import { validatorLogin, validatorPassword } from '~/query/auth/auth.constants';

export const SchemaSettings = yup.object({
    login: validatorLogin,
    password: validatorPassword,
});

export type FormDataSettings = yup.InferType<typeof SchemaSettings>;
export type FormFieldsSettings = {
    login: string;
    password: string;
};
