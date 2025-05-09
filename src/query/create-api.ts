import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './api.constants';

export const publicApi = createApi({
    reducerPath: 'publicApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: () => ({}),
});

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('adminToken') || 'anonymous';
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: () => ({}),
});
