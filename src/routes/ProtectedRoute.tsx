import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { UserRole } from '~/store/auth/auth-slice';
import { useAuth } from '~/store/auth/useAuth';

import { PageRoutes } from './PageRoutes.constants';

type Props = {
    requiredRole?: UserRole;
    children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={PageRoutes.LOGIN} state={{ from: location }} replace />;
    }

    return children;
}
