import * as yup from 'yup';

import {
    validatorLogin,
    validatorPassword,
    validatorPasswordRepeat,
} from '~/query/auth/auth.constants';

export const SchemaFormModalRecovery = yup.object({
    login: validatorLogin,
    password: validatorPassword,
    passwordConfirm: validatorPasswordRepeat,
});

export type FormDataFormModalRecovery = yup.InferType<typeof SchemaFormModalRecovery>;
export type FormFieldsFormModalRecovery = {
    login: string;
    password: string;
    passwordConfirm: string;
};
