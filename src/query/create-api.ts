import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage, setDataToLocalStorage } from '~/localStorage/localStorage';

import { BASE_URL } from './api.constants';
import { ApiEndpoints } from './constants/api';

export const publicApi = createApi({
    reducerPath: 'publicApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: () => ({}),
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
    pendingRequests.forEach((callback) => callback());
    pendingRequests = [];
};

export const baseQueryWithToken = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = getDataFromLocalStorage(localStorageData.access_token) || '';
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQueryWithToken(args, api, extraOptions);

    // if (result.error?.status === 401 || result.error?.status === 403) {
    if (result.error?.status === 401) {
        if (isRefreshing) {
            try {
                await new Promise<void>((resolve) => {
                    pendingRequests.push(resolve);
                });
                return await baseQueryWithToken(args, api, extraOptions);
            } catch {
                return result;
            }
        }

        isRefreshing = true;

        try {
            const refreshResult = await baseQueryWithToken(
                ApiEndpoints.AUTH_GET_REFRESH,
                api,
                extraOptions,
            );

            if (refreshResult.error) {
                localStorage.removeItem(localStorageData.access_token);
                return result;
            }

            const newToken = refreshResult.meta?.response?.headers.get('Authentication-Access');
            if (newToken) {
                setDataToLocalStorage(localStorageData.access_token, newToken);
                resolvePendingRequests();
                result = await baseQueryWithToken(args, api, extraOptions);
            } else {
                localStorage.removeItem(localStorageData.access_token);
            }
        } finally {
            isRefreshing = false;
        }
    }

    return result;
};

export const tokenApi = createApi({
    reducerPath: 'tokenApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
