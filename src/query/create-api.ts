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
    if (result.error?.status === 401) {
        const refreshResult = await baseQueryWithToken(
            ApiEndpoints.AUTH_GET_REFRESH,
            api,
            extraOptions,
        );
        const newToken = refreshResult.meta?.response?.headers.get('Authentication-Access');
        if (newToken) {
            setDataToLocalStorage(localStorageData.access_token, newToken);
            result = await baseQueryWithToken(args, api, extraOptions);
        } else {
            localStorage.removeItem(localStorageData.access_token);
        }
    }

    return result;
};

export const tokenApi = createApi({
    reducerPath: 'tokenApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
