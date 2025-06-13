import { tokenApi } from '~/query/create-api.ts';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { transformErrorResponse } from '../errors/transformErrors';
import { providesBlogerTagById, providesBlogerTags } from './blogs.tags';
import {
    GetAllBloggersRequest,
    GetAllBloggersResponse,
    GetBloggerByIdRequest,
    GetBloggerByIdResponse,
} from './blogs.type';

export const bloggerApi = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.BLOGGER],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllBloggers: builder.query<GetAllBloggersResponse, GetAllBloggersRequest>({
                query: (params) => ({
                    url: ApiEndpoints.BLOGGERS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGERS,
                    params,
                }),
                transformErrorResponse,
                providesTags: providesBlogerTags,
            }),
            getBloggerById: builder.query<GetBloggerByIdResponse, GetBloggerByIdRequest>({
                query: ({ bloggerId, ...params }) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${bloggerId}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                    params,
                }),
                transformErrorResponse,
                providesTags: providesBlogerTagById,
            }),
        }),
    });

export const { useGetAllBloggersQuery, useGetBloggerByIdQuery, useLazyGetAllBloggersQuery } =
    bloggerApi;
