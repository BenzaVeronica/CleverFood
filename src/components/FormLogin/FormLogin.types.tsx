import * as yup from 'yup';

import { validatorLogin, validatorPassword } from '~/query/auth/auth.constants';

export const SchemaLogin = yup.object({
    login: validatorLogin,
    password: validatorPassword,
});

export type FormDataLogin = yup.InferType<typeof SchemaLogin>;
export type FormFieldsLogin = {
    login: string;
    password: string;
};
