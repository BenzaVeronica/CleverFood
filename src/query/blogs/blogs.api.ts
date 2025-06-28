import { tokenApi } from '~/query/create-api.ts';

import { ApiGroups } from '../constants/api-group-names';
import { ApiMethods } from '../constants/api-methods';
import { EndpointNames } from '../constants/endpoint-names';
import { EndpointUrl } from '../constants/enpoint-url';
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
        addTagTypes: [ApiGroups.BLOGGER],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.GET_BLOGGERS]: builder.query<
                GetAllBloggersResponse,
                GetAllBloggersRequest
            >({
                query: (params) => ({
                    apiGroupName: ApiGroups.BLOGGER,
                    name: EndpointNames.GET_BLOGGERS,
                    url: EndpointUrl.BLOGGERS,
                    method: ApiMethods.GET,
                    params,
                }),
                transformErrorResponse,
                providesTags: providesBlogerTags,
            }),
            [EndpointNames.GET_BLOGGER_BY_ID]: builder.query<
                GetBloggerByIdResponse,
                GetBloggerByIdRequest
            >({
                query: ({ bloggerId, ...params }) => ({
                    apiGroupName: ApiGroups.BLOGGER,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                    url: `${EndpointUrl.BLOGGERS}/${bloggerId}`,
                    method: ApiMethods.GET,
                    params,
                }),
                transformErrorResponse,
                providesTags: providesBlogerTagById,
            }),
        }),
    });

export const { useGetAllBloggersQuery, useGetBloggerByIdQuery, useLazyGetAllBloggersQuery } =
    bloggerApi;
