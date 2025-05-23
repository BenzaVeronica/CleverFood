import { createBrowserRouter, Navigate } from 'react-router';

import LoginPage from '~/pages/LoginPage';
import NotFoundPage from '~/pages/NotFoundPage';
import { RegisterPage } from '~/pages/RegisterPage';
import TheMostPage from '~/pages/TheMostPage';

import AppLayout from '../app/App';
import CategoryPage from '../pages/CategoryPage';
import HomePage from '../pages/HomePage';
import RecipePage from '../pages/RecipePage';
import { PageRoutes } from './PageRoutes.constants';
import ProtectedRoute from './ProtectedRoute.tsx';

export const serverParameter = 'emailVerified';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        // errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    // <ProtectedRoute requiredRole='admin'>
                    <HomePage />
                    // </ProtectedRoute>
                ),
            },
            {
                path: PageRoutes.MOST,
                element: <TheMostPage />,
            },
            {
                path: ':categoryId',
                element: <CategoryPage />,
                children: [
                    {
                        path: ':subcategoryId',
                        errorElement: <Navigate to={PageRoutes.NOT_FOUND} replace />,
                        element: <CategoryPage />,
                    },
                ],
            },
            {
                path: ':categoryId/:subcategoryId/:recipeId',
                element: <RecipePage />,
            },
        ],
    },
    {
        path: PageRoutes.NOT_FOUND,
        element: <NotFoundPage />,
    },
    {
        path: PageRoutes.LOGIN,
        element: <LoginPage />,
    },
    {
        path: PageRoutes.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: PageRoutes.REGISTER_VERIFICATION,
        element: <RegisterPage />,
    },
]);
