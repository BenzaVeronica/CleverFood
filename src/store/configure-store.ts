import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { publicApi, tokenApi } from '~/query/create-api';

import errorReducer, { errorSlice } from '../widgets/error/error-slice';
import appReducer, { appSlice } from './app-slice';
import authReducer, { authSlice } from './auth/auth-slice';
import categoryReducer, { categorySlice } from './category/category-slice';
import recipeFilterReducer, { recipeFilterSlice } from './recipe/recipe-filter-slice';
const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipeFilterSlice.name]: recipeFilterReducer,
    [categorySlice.name]: categoryReducer,
    [errorSlice.name]: errorReducer,
    [authSlice.name]: authReducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(publicApi.middleware, tokenApi.middleware),
    devTools: !isProduction,
});
