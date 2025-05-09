import { createBrowserRouter, Navigate } from 'react-router';

import NotFoundPage from '~/pages/NotFoundPage';
import TheMostPage from '~/pages/TheMostPage';

import AppLayout from '../app/App';
import CategoryPage from '../pages/CategoryPage';
import HomePage from '../pages/HomePage';
import RecipePage from '../pages/RecipePage';
import { PageRoutes } from './PageRoutes.constants';
// import ProtectedRoute from './ProtectedRoute.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
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
        //   element: <OnlyHeaderLayout>
        //     <NotFoundPage />
        //   </OnlyHeaderLayout>
    },
]);
