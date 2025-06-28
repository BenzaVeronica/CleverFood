import { FormLoginValues } from '~/components/FormRegistry/FormRegistry.types';
import { publicApi, tokenApi } from '~/query/create-api.ts';

import { ApiGroups } from '../constants/api-group-names';
import { ApiMethods } from '../constants/api-methods';
import { EndpointNames } from '../constants/endpoint-names';
import { EndpointUrl } from '../constants/enpoint-url';
import {
    transformErrorResponse,
    transformErrorWithMessageResponse,
} from '../errors/transformErrors';
import {
    authServerResponse,
    forgetPswRequest,
    registerUserRequest,
    registerUserResponse,
    resetRequest,
    verifyOtpRequest,
} from './auth.type';
import { saveAuthTokenFromHeaders } from './auth.utils';

export const authApi = publicApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.SIGH_UP]: builder.mutation<registerUserResponse, registerUserRequest>({
            query: (body) => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.SIGH_UP,
                url: EndpointUrl.AUTH_SIGH_UP,
                method: ApiMethods.POST,
                body,
            }),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),
        [EndpointNames.LOGIN]: builder.mutation<registerUserResponse, FormLoginValues>({
            query: (body) => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.LOGIN,
                url: EndpointUrl.AUTH_LOGIN,
                method: ApiMethods.POST,
                body,
                credentials: 'include',
            }),
            onQueryStarted: saveAuthTokenFromHeaders(),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),

        [EndpointNames.GET_VERIFY]: builder.query<void, string>({
            query: (token) => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.GET_VERIFY,
                url: `${EndpointUrl.AUTH_GET_VERIFY}/${token}`,
                method: ApiMethods.GET,
            }),
            transformErrorResponse,
        }),

        [EndpointNames.FORGOT_PASSWORD]: builder.mutation<authServerResponse, forgetPswRequest>({
            query: (body) => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.FORGOT_PASSWORD,
                url: EndpointUrl.AUTH_FORGOT_PASSWORD,
                method: ApiMethods.POST,
                body,
            }),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),
        [EndpointNames.VERIFY_OTP]: builder.mutation<authServerResponse, verifyOtpRequest>({
            query: (body) => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.VERIFY_OTP,
                url: EndpointUrl.AUTH_VERIFY_OTP,
                method: ApiMethods.POST,
                body,
            }),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),
        [EndpointNames.RESET_PASSWORD]: builder.mutation<authServerResponse, resetRequest>({
            query: (body) => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.RESET_PASSWORD,
                url: EndpointUrl.AUTH_RESET_PASSWORD,
                method: ApiMethods.POST,
                body,
            }),
            transformErrorResponse,
        }),
    }),
});

export const authTokenApi = tokenApi.injectEndpoints({
    endpoints: (builder) => ({
        [EndpointNames.GET_REFRESH]: builder.query<void, void>({
            query: () => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.GET_REFRESH,
                url: EndpointUrl.AUTH_GET_REFRESH,
                method: ApiMethods.GET,
                credentials: 'include',
            }),
            onQueryStarted: saveAuthTokenFromHeaders(),
            transformErrorResponse,
        }),

        [EndpointNames.GET_CHECK_AUTH]: builder.query<void, void>({
            query: () => ({
                apiGroupName: ApiGroups.AUTH,
                name: EndpointNames.GET_CHECK_AUTH,
                url: EndpointUrl.AUTH_GET_CHECK_AUTH,
                method: ApiMethods.GET,
                credentials: 'include',
            }),
            transformErrorResponse,
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginMutation,
    useGetVerifyQuery,
    usePostForgetPswByEmailMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;

export const { useGetRefreshTokenQuery, useGetCheckAuthQuery, useLazyGetCheckAuthQuery } =
    authTokenApi;
