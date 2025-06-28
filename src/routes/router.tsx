import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import BloggerPage from '~/pages/BloggerPage.tsx';
import CategoryPage from '~/pages/CategoryPage';
import RecipeCreateEditPage from '~/pages/RecipeCreateEditPage.tsx';

import AppLayout from '../app/App';
import { PageRoutes } from './PageRoutes.constants';
import ProtectedRoute from './ProtectedRoute.tsx';

const HomePage = lazy(() => import('~/pages/HomePage'));
const LoginPage = lazy(() => import('~/pages/LoginPage'));
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));
const TheMostPage = lazy(() => import('~/pages/TheMostPage'));
const RecipePage = lazy(() => import('~/pages/RecipePage'));
// const BloggerPage = lazy(() => import('~/pages/BloggerPage'));
const BlogsPage = lazy(() => import('~/pages/BlogsPage'));
const ProfilePage = lazy(() => import('~/pages/ProfilePage'));
// const RecipeCreateEditPage = lazy(() => import('~/pages/RecipeCreateEditPage'));
const RegisterPage = lazy(() => import('~/pages/RegisterPage'));
const SettingsPage = lazy(() => import('~/pages/SettingsPage'));
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
            {
                path: `${PageRoutes.DRAFT_EDIT}/:draftId`,
                element: <RecipeCreateEditPage />,
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
