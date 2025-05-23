import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage } from '~/localStorage/localStorage';
import { useGetCheckAuthQuery } from '~/query/auth/auth.api';
import { PageRoutes } from '~/routes/PageRoutes.constants';

// type User = {
//     id: string;
//     email: string;
//     role: string;
// };

type UseAuthReturn = {
    // user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
};

export function useAuth(): UseAuthReturn {
    const navigate = useNavigate();

    // const [user, setUser] = useState<User | null>(null);
    const accessToken = getDataFromLocalStorage(localStorageData.access_token);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(accessToken));

    const { data, error } = useGetCheckAuthQuery(undefined, {
        skip: !accessToken,
    });

    const logout = useCallback(() => {
        localStorage.removeItem(localStorageData.access_token);
        // setUser(null);
        setIsAuthenticated(false);
        navigate(PageRoutes.LOGIN);
    }, [navigate]);

    useEffect(() => {
        if (!accessToken) {
            setIsAuthenticated(false);
            // setUser(null);
            return;
        }

        if (error) {
            // logout();
            return;
        }

        if (data) {
            setIsAuthenticated(true);
        }
    }, [data, error, logout]);

    return {
        // user,
        isAuthenticated,
        logout,
    };
}
