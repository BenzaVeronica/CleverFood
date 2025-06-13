import * as yup from 'yup';

import {
    validatorEmail,
    validatorFirstName,
    validatorLastName,
    validatorLogin,
} from '~/query/auth/auth.constants';

export const SchemaSettings = yup.object({
    firstName: validatorFirstName,
    lastName: validatorLastName,
    email: validatorEmail,
    login: validatorLogin,
});

export type FormDataSettings = yup.InferType<typeof SchemaSettings>;
export type FormFieldsSettings = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
};
