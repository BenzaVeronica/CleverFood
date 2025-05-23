export type FormLoginValues = {
    login: string;
    password: string;
};
export type FormRegistryValues = FormLoginValues & {
    firstName: string;
    lastName: string;
    email: string;
    repeatPassword: string;
};
