import { jwtDecode } from 'jwt-decode';

import { User } from './user.types';

type UserJWTPayload = User & {
    iat: number;
    exp: number;
};

export const getUserFromJWT = (token: string): UserJWTPayload | null => {
    try {
        return jwtDecode<UserJWTPayload>(token);
    } catch {
        return null;
    }
};
