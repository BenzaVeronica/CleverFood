import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage, setDataToLocalStorage } from '~/localStorage/localStorage';
import { useLazyGetCheckAuthQuery } from '~/query/auth/auth.api';
import { getUserFromJWT } from '~/query/user/getUserFromJWT';
import { User } from '~/query/user/user.types';
import { PageRoutes } from '~/routes/PageRoutes.constants';

import { useAppDispatch } from '../hooks';
import { selectAuthWasLoggedIn } from './auth-selector';
import { setWasLoggedIn } from './auth-slice';

type UseAuthReturn = {
    user: User | null;
    isAuthenticated: boolean;
    logout: () => void;
};

export function useAuth(): UseAuthReturn {
    const navigate = useNavigate();
    const wasLoggedIn = useSelector(selectAuthWasLoggedIn);

    const [user, setUser] = useState<User | null>(null);
    const accessToken = getDataFromLocalStorage(localStorageData.access_token);
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(accessToken));

    const [triggerGetAuth, { error }] = useLazyGetCheckAuthQuery();

    useEffect(() => {
        if (!accessToken && wasLoggedIn === false) {
            triggerGetAuth();
        }
    }, [accessToken, wasLoggedIn]);

    const logout = useCallback(() => {
        localStorage.removeItem(localStorageData.access_token);
        setUser(null);
        localStorage.removeItem(localStorageData.userId);
        setIsAuthenticated(false);
        navigate(PageRoutes.LOGIN);
    }, [navigate]);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (wasLoggedIn) {
            dispatch(setWasLoggedIn(false));
        }
    }, []);

    useEffect(() => {
        if (!accessToken || error) {
            logout();
            return;
        }

        if (accessToken) {
            setIsAuthenticated(true);
            const user = getUserFromJWT(accessToken);
            setUser(user);
            setDataToLocalStorage(localStorageData.userId, user?.userId);
        }
    }, [error, logout, accessToken]);

    return {
        user,
        isAuthenticated,
        logout,
    };
}
