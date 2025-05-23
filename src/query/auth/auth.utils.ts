import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

import { localStorageData } from '~/localStorage/constants';
import { setDataToLocalStorage } from '~/localStorage/localStorage';

type QueryFulfilled = {
    data: unknown;
    meta?: FetchBaseQueryMeta;
};

export const saveAuthTokenFromHeaders =
    () =>
    async (_: unknown, { queryFulfilled }: { queryFulfilled: Promise<QueryFulfilled> }) => {
        try {
            const response = await queryFulfilled;
            const token = response?.meta?.response?.headers.get('Authentication-Access');
            if (token) {
                setDataToLocalStorage(localStorageData.access_token, token);
            }
        } catch {
            localStorage.removeItem(localStorageData.access_token);
        }
    };
