import * as yup from 'yup';

import { validatorEmail, validatorFirstName, validatorLastName } from '~/query/auth/auth.constants';

export const SchemaFormRegistryStep1 = yup.object({
    firstName: validatorFirstName,
    lastName: validatorLastName,
    email: validatorEmail,
});

export type FormDataFormRegistryStep1 = yup.InferType<typeof SchemaFormRegistryStep1>;
export type FormFieldsFormRegistryStep1 = {
    firstName: string;
    lastName: string;
    email: string;
};
