import { Tags } from '../constants/tags';
import { SubscriptionRequest } from '../user/user.types';
import {
    GetAllBloggersResponse,
    GetBloggerByIdRequest,
    GetBloggerByIdResponse,
} from './blogs.type';

export const LIST_TAG = [{ type: Tags.BLOGGER as const, id: 'LIST' }];

export const providesBlogerTags = (result?: GetAllBloggersResponse) => {
    if (!result) return LIST_TAG;

    const tags = [...LIST_TAG];

    if (result.favorites) {
        tags.push(
            ...result.favorites.map((blogger) => ({
                type: Tags.BLOGGER as const,
                id: blogger._id,
            })),
        );
    }

    if (result.others) {
        tags.push(
            ...result.others.map((blogger) => ({
                type: Tags.BLOGGER as const,
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
    return [{ type: Tags.BLOGGER as const, id }];
};
export const invalidateBlogerTags = (_result: unknown, error: unknown, arg: SubscriptionRequest) =>
    error
        ? []
        : [
              { type: Tags.BLOGGER as const, id: arg.toUserId },
              ...LIST_TAG.map((tag) => ({ type: tag.type, id: tag.id })),
          ];

export const invalidateBlogerListTags = (_result: unknown, error: unknown, _arg: unknown) =>
    error ? [] : LIST_TAG;
