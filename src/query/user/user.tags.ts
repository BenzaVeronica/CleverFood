import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage } from '~/localStorage/localStorage';

import { ApiGroups } from '../constants/api-group-names';

export const TAG_LIST_USERS = [{ type: ApiGroups.USERS, id: 'LIST' }];
export const TAG_USERS_ME = [{ type: ApiGroups.USERS, id: 'ME' }];

export const invalidateUserListTags = (_result: unknown, error: unknown, _arg: unknown) =>
    error ? [] : TAG_LIST_USERS;

export const invalidateCreateNoteTags = (_result: unknown, error: unknown, _arg: unknown) => {
    if (error) return [];
    const userId = getDataFromLocalStorage(localStorageData.userId);
    return [
        { type: ApiGroups.USERS, id: 'ME' },
        ...(userId ? [{ type: ApiGroups.BLOGGER, id: userId }] : []),
    ];
};
