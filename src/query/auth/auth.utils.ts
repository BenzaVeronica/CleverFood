import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

import { localStorageData } from '~/localStorage/constants';
import { setDataToLocalStorage } from '~/localStorage/localStorage';
type QueryFulfilled = {
    data: unknown;
    meta?: { response?: Response } | FetchBaseQueryMeta;
};
type PromiseQueryFulfilled = {
    queryFulfilled: Promise<QueryFulfilled>;
};
export const saveAuthTokenFromHeaders =
    () =>
    async (_: unknown, { queryFulfilled }: PromiseQueryFulfilled) => {
        try {
            const result = await queryFulfilled;
            const token = result.meta?.response?.headers.get('Authentication-Access');
            if (token) {
                setDataToLocalStorage(localStorageData.access_token, token);
            }
        } catch {
            localStorage.removeItem(localStorageData.access_token);
        }
    };
