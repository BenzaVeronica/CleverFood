import * as yup from 'yup';

import { validatorPassword, validatorPasswordRepeat } from '~/query/auth/auth.constants';

export const SchemaFormModalChangePsw = yup.object({
    password: validatorPassword,
    newPassword: validatorPassword,
    passwordConfirm: validatorPasswordRepeat,
});

export type FormDataFormModalChangePsw = yup.InferType<typeof SchemaFormModalChangePsw>;
export type FormFieldsFormModalChangePsw = {
    password: string;
    newPassword: string;
    passwordConfirm: string;
};
