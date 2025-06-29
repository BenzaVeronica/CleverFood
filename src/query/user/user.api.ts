import { localStorageData } from '~/localStorage/constants';
import { setDataToLocalStorage } from '~/localStorage/localStorage';
import { tokenApi } from '~/query/create-api.ts';
import { addNoteFromCache, deleteNoteFromCache } from '~/query/recipe/recipe.cacheUtils';

import { invalidateBlogerTags } from '../blogs/blogs.tags';
import { BloggerInfo } from '../blogs/blogs.type';
import { ApiGroups } from '../constants/api-group-names';
import { ApiMethods } from '../constants/api-methods';
import { EndpointNames } from '../constants/endpoint-names';
import { EndpointUrl } from '../constants/enpoint-url';
import {
    transformErrorResponse,
    transformErrorWithMessageResponse,
} from '../errors/transformErrors';
import { invalidateCreateNoteTags, TAG_USERS_ME } from './user.tags';
import {
    PasswordRequest,
    SubscriptionRequest,
    UserAllResponse,
    UserInfo,
    UserNoteRequest,
    UserNoteResponse,
    UserPhotoResponse,
    UserRequest,
} from './user.types';

export const userApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [ApiGroups.USERS, ApiGroups.RECIPE, ApiGroups.BLOGGER],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.USERS_TOGGLE_SUBSCRIPTION]: builder.mutation<void, SubscriptionRequest>({
                query: (body) => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.USERS_TOGGLE_SUBSCRIPTION,
                    url: EndpointUrl.USERS_TOGGLE_SUBSCRIPTION,
                    method: ApiMethods.PATCH,
                    body,
                }),
                transformErrorResponse,
                invalidatesTags: invalidateBlogerTags,
            }),
            [EndpointNames.UPDATE_USERS_UPDATE_ME_INFO]: builder.mutation<void, UserRequest>({
                query: (body) => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.UPDATE_USERS_UPDATE_ME_INFO,
                    url: EndpointUrl.USERS_UPDATE_ME_INFO,
                    method: ApiMethods.PATCH,
                    body,
                }),
                transformErrorResponse,
            }),
            [EndpointNames.UPDATE_USERS_UPDATE_ME_PSW]: builder.mutation<void, PasswordRequest>({
                query: (body) => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.UPDATE_USERS_UPDATE_ME_PSW,
                    url: EndpointUrl.USERS_UPDATE_ME_PSW,
                    method: ApiMethods.PATCH,
                    body,
                }),
                transformErrorResponse: transformErrorWithMessageResponse,
            }),
            [EndpointNames.CREATE_USERS_PHOTO]: builder.mutation<UserPhotoResponse, FormData>({
                query: (body) => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.CREATE_USERS_PHOTO,
                    url: EndpointUrl.USERS_ME_PHOTO,
                    method: ApiMethods.POST,
                    body,
                }),
                transformErrorResponse,
            }),
            [EndpointNames.GET_USER_ME]: builder.query<BloggerInfo, void>({
                query: () => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.GET_USER_ME,
                    url: EndpointUrl.USERS_ME,
                    method: ApiMethods.GET,
                }),
                providesTags: TAG_USERS_ME,
                async onQueryStarted(_, { queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        setDataToLocalStorage(localStorageData.drafts, data.drafts);
                    } catch (error) {
                        console.error(error);
                    }
                },
                transformErrorResponse,
            }),
            [EndpointNames.CREATE_USERS_NOTES]: builder.mutation<UserNoteResponse, UserNoteRequest>(
                {
                    query: (body) => ({
                        apiGroupName: ApiGroups.USERS,
                        name: EndpointNames.CREATE_USERS_NOTES,
                        url: EndpointUrl.USERS_NOTES,
                        method: ApiMethods.POST,
                        body,
                    }),
                    transformErrorResponse,
                    onQueryStarted: addNoteFromCache,
                },
            ),
            [EndpointNames.DELETE_USERS_NOTES]: builder.mutation<void, string>({
                query: (id) => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.DELETE_USERS_NOTES,
                    url: `${EndpointUrl.USERS_NOTES}/${id}`,
                    method: ApiMethods.DELETE,
                }),
                onQueryStarted: deleteNoteFromCache,
                invalidatesTags: invalidateCreateNoteTags,
            }),
            [EndpointNames.DELETE_USER]: builder.mutation<void, void>({
                query: (id) => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.DELETE_USER,
                    url: `${EndpointUrl.PROFILE}/${id}`,
                    method: ApiMethods.DELETE,
                }),
            }),
            [EndpointNames.GET_USERS]: builder.query<UserAllResponse[], void>({
                query: () => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.GET_USERS,
                    url: EndpointUrl.USERS_GET_ALL,
                    method: ApiMethods.GET,
                }),
                transformResponse: (response: UserAllResponse[]): UserInfo[] =>
                    response.map((user) => ({
                        ...user,
                        photoLink: user.photo,
                    })),
            }),
        }),
    });

export const {
    useToggleSubscriptionMutation,
    useGetUserMeQuery,
    useLazyGetUserMeQuery,
    useCreateUserPhotoMutation,
    useCreateUsersNotesMutation,
    useDeleteProfileMutation,
    useDeleteUsersNotesMutation,
    useUpdateUserInfoMutation,
    useUpdateUserPasswordMutation,
    useGetAllUsersQuery,
} = userApiSlice;
