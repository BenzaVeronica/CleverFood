import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage } from '~/localStorage/localStorage';
import { useGetCheckAuthQuery } from '~/query/auth/auth.api';
import { getUserFromJWT } from '~/query/user/getUserFromJWT';
import { User } from '~/query/user/user.types';
import { PageRoutes } from '~/routes/PageRoutes.constants';

type UseAuthReturn = {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
};

export function useAuth(): UseAuthReturn {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const accessToken = getDataFromLocalStorage(localStorageData.access_token);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(accessToken));

    const { data, error } = useGetCheckAuthQuery(undefined, {
        skip: !accessToken,
    });

    const logout = useCallback(() => {
        localStorage.removeItem(localStorageData.access_token);
        setUser(null);
        setIsAuthenticated(false);
        navigate(PageRoutes.LOGIN);
    }, [navigate]);

    useEffect(() => {
        if (!accessToken) {
            logout();
            return;
        }

        // if (isTokenExpired(accessToken)) {
        // if (error) {
        // logout();
        //     return;
        // }

        // if (data) {
        if (accessToken) {
            setIsAuthenticated(true);
            const user = getUserFromJWT(accessToken);
            setUser(user);
        }
    }, [data, error, logout, accessToken]);

    return {
        user,
        isAuthenticated,
        logout,
    };
}
