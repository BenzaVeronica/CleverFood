import * as yup from 'yup';

import { validatorEmail } from '~/query/auth/auth.constants';

export const SchemaModalRecoveryForm = yup.object({
    email: validatorEmail,
});

export type FormDataModalRecoveryForm = yup.InferType<typeof SchemaModalRecoveryForm>;
export type FormFieldsModalRecoveryForm = {
    email: string;
};
