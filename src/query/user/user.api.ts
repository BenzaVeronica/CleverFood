import { tokenApi } from '~/query/create-api.ts';

import { invalidateBlogerTags } from '../blogs/blogs.tags';
import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { transformErrorResponse } from '../errors/transformErrors';
import { SubscriptionRequest } from './user.types';

export const userApi = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.BLOGGER],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            toggleSubscription: builder.mutation<void, SubscriptionRequest>({
                query: (body) => ({
                    url: ApiEndpoints.USERS_TOGGLE_SUBSCRIPTION,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.USERS,
                    name: EndpointNames.USERS_TOGGLE_SUBSCRIPTION,
                    body,
                }),
                transformErrorResponse,
                invalidatesTags: invalidateBlogerTags,
            }),
        }),
    });

export const { useToggleSubscriptionMutation } = userApi;
