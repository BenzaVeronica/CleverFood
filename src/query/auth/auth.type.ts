import { FormRegistryValues } from '~/components/FormRegistry/FormRegistry.types';

export type registerUserRequest = Omit<FormRegistryValues, 'repeatPassword'>;
export type registerUserResponse = {
    statusCode: number;
    message: string;
    error?: string;
};

export type forgetPswRequest = { email: string };
export type verifyOtpRequest = { email: string; otpToken: string };
export type authServerResponse = { success: boolean; message?: string };

export type resetRequest = forgetPswRequest & {
    login: string;
    password: string;
    passwordConfirm: string;
};
