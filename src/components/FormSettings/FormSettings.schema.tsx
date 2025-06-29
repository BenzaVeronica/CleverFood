import * as yup from 'yup';

import { validatorFirstName, validatorLastName } from '~/query/auth/auth.constants';

export const SchemaSettings = yup.object({
    firstName: validatorFirstName,
    lastName: validatorLastName,
});

export type FormDataSettings = yup.InferType<typeof SchemaSettings>;
export type FormFieldsSettings = {
    firstName: string;
    lastName: string;
};
