import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export type UserRole = 'admin' | 'user' | 'guest';

type User = {
    id: number;
    email: string;
    role: UserRole;
};

interface Auth {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    hasRole: (requiredRole: UserRole) => boolean;
}

const fakeAuthAPI = {
    login: async (email: string, password: string) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@test.com' && password === '12345') {
                    resolve({ id: 1, email, role: 'admin' });
                } else if (email && password) {
                    resolve({ id: 2, email, role: 'user' });
                } else {
                    reject(new Error('Неверные учетные данные'));
                }
            }, 500);
        }),
    logout: async () => {
        localStorage.removeItem('user');
    },
};

export function useAuth(): Auth {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (e) {
                console.error(e);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            try {
                setLoading(true);
                const userData = (await fakeAuthAPI.login(email, password)) as User;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                setError(null);
                navigate('/');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        },
        [navigate],
    );

    const logout = useCallback(async () => {
        try {
            await fakeAuthAPI.logout();
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout', err);
        }
    }, [navigate]);

    const hasRole = useCallback(
        (requiredRole: UserRole): boolean => user?.role === requiredRole,
        [user],
    );

    return {
        user,
        // isAuthenticated: !!user,
        // isAuthenticated: false,
        isAuthenticated: true,
        loading,
        error,
        login,
        logout,
        hasRole,
    };
}
