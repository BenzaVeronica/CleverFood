import { createBrowserRouter, Navigate } from 'react-router';

import { BloggerPage } from '~/pages/BloggerPage.tsx';
import { BlogsPage } from '~/pages/BlogsPage.tsx';
import LoginPage from '~/pages/LoginPage';
import NotFoundPage from '~/pages/NotFoundPage';
import { ProfilePage } from '~/pages/ProfilePage.tsx';
import { RecipeCreateEditPage } from '~/pages/RecipeCreateEditPage.tsx';
import { RegisterPage } from '~/pages/RegisterPage';
import { SettingsPage } from '~/pages/SettingsPage.tsx';
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
                    <ProtectedRoute requiredRole='admin'>
                        <HomePage />
                    </ProtectedRoute>
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
            {
                path: `${PageRoutes.RECIPE_EDIT}/:categoryId/:subcategoryId/:recipeId`,
                element: <RecipeCreateEditPage />,
            },
            {
                path: PageRoutes.RECIPE_CREATE,
                element: <RecipeCreateEditPage />,
            },
            {
                path: PageRoutes.BLOGS,
                element: <BlogsPage />,
            },
            {
                path: `${PageRoutes.BLOGS}/:bloggerId`,
                element: <BloggerPage />,
            },
            {
                path: PageRoutes.PROFILE,
                element: <ProfilePage />,
            },
            {
                path: PageRoutes.SETTINGS,
                element: <SettingsPage />,
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
