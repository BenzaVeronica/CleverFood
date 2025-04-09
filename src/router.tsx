import { createBrowserRouter } from 'react-router';

import TheMostPage from '~/pages/TheMostPage';

import AppLayout from './app/App';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'the-most',
                element: <TheMostPage />,
            },
            {
                path: 'categories',
                // element: <CategoriesLayout />,
                children: [
                    {
                        index: true,
                        element: <CategoryPage />,
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
                ],
            },
        ],
    },
]);
