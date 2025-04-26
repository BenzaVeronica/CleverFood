import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import ErrorPage from '~/pages/ErrorPage';
import { useAuth, UserRole } from '~/store/user/useAuth';

type Props = {
    requiredRole?: UserRole;
    children: ReactNode;
};

export default function ProtectedRoute({ children, requiredRole = 'guest' }: Props) {
    const { user, isAuthenticated } = useAuth();
    // const isAuthenticated = true;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <ErrorPage />;
    }

    return children;
}
