import { ApiGroups } from '../constants/api-group-names';
import { SubscriptionRequest } from '../user/user.types';
import {
    GetAllBloggersResponse,
    GetBloggerByIdRequest,
    GetBloggerByIdResponse,
} from './blogs.type';

export const TAG_LIST_BLOGGER = [{ type: ApiGroups.BLOGGER, id: 'LIST' }];

export const providesBlogerTags = (result?: GetAllBloggersResponse) => {
    if (!result) return TAG_LIST_BLOGGER;

    const tags = [...TAG_LIST_BLOGGER];

    if (result.favorites) {
        tags.push(
            ...result.favorites.map((blogger) => ({
                type: ApiGroups.BLOGGER,
                id: blogger._id,
            })),
        );
    }

    if (result.others) {
        tags.push(
            ...result.others.map((blogger) => ({
                type: ApiGroups.BLOGGER,
                id: blogger._id,
            })),
        );
    }

    return tags;
};
export const providesBlogerTagById = (
    _result: GetBloggerByIdResponse | undefined,
    _error: unknown,
    arg: GetBloggerByIdRequest,
) => {
    const id = arg.bloggerId || 'LIST';
    return [{ type: ApiGroups.BLOGGER, id }];
};
export const invalidateBlogerTags = (_result: unknown, error: unknown, arg: SubscriptionRequest) =>
    error
        ? []
        : [
              { type: ApiGroups.BLOGGER, id: arg.toUserId },
              ...TAG_LIST_BLOGGER.map((tag) => ({ type: tag.type, id: tag.id })),
          ];

export const invalidateBlogerListTags = (_result: unknown, error: unknown, _arg: unknown) =>
    error ? [] : TAG_LIST_BLOGGER;
