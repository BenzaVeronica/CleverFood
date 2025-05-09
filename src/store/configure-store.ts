import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { adminApi, publicApi } from '~/query/create-api';

import errorReducer, { errorSlice } from '../widgets/error/error-slice';
import appReducer, { appSlice } from './app-slice';
import categoryReducer, { categorySlice } from './category/category-slice';
import recipeFilterReducer, { recipeFilterSlice } from './recipe/recipe-filter-slice';
const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipeFilterSlice.name]: recipeFilterReducer,
    [categorySlice.name]: categoryReducer,
    [errorSlice.name]: errorReducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(publicApi.middleware, adminApi.middleware),
    devTools: !isProduction,
});
