import { createBrowserRouter } from 'react-router';

import TheMostPage from '~/pages/TheMostPage';

import AppLayout from '../app/App';
import CategoryPage from '../pages/CategoryPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import RecipePage from '../pages/RecipePage';
// import ProtectedRoute from './ProtectedRoute.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
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
                path: 'the-most',
                element: <TheMostPage />,
            },
            {
                path: ':categoryId',
                element: <CategoryPage />,
                children: [
                    {
                        path: ':subcategoryId',
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
]);
