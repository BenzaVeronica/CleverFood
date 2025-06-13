import * as yup from 'yup';

import { validatorPassword, validatorPasswordRepeat } from '~/query/auth/auth.constants';

export const SchemaFormModalChangePsw = yup.object({
    oldpassword: validatorPassword,
    password: validatorPassword,
    passwordConfirm: validatorPasswordRepeat,
});

export type FormDataFormModalChangePsw = yup.InferType<typeof SchemaFormModalChangePsw>;
export type FormFieldsFormModalChangePsw = {
    oldpassword: string;
    password: string;
    passwordConfirm: string;
};
