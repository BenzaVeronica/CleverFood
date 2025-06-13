import { FormLoginValues } from '~/components/FormRegistry/FormRegistry.types';
import { publicApi, tokenApi } from '~/query/create-api.ts';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
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
        registerUser: builder.mutation<registerUserResponse, registerUserRequest>({
            query: (body) => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.SIGH_UP,
                url: ApiEndpoints.AUTH_SIGH_UP,
                method: 'POST',
                body,
            }),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),
        login: builder.mutation<registerUserResponse, FormLoginValues>({
            query: (body) => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.LOGIN,
                url: ApiEndpoints.AUTH_LOGIN,
                method: 'POST',
                body,
                credentials: 'include',
            }),
            onQueryStarted: saveAuthTokenFromHeaders(),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),

        getVerify: builder.query<void, string>({
            query: (token) => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.GET_VERIFY,
                url: `${ApiEndpoints.AUTH_GET_VERIFY}/${token}`,
                method: 'GET',
            }),
            transformErrorResponse,
        }),

        postForgetPswByEmail: builder.mutation<authServerResponse, forgetPswRequest>({
            query: (body) => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.FORGOT_PASSWORD,
                url: ApiEndpoints.AUTH_FORGOT_PASSWORD,
                method: 'POST',
                body,
            }),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),
        verifyOtp: builder.mutation<authServerResponse, verifyOtpRequest>({
            query: (body) => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.VERIFY_OTP,
                url: ApiEndpoints.AUTH_VERIFY_OTP,
                method: 'POST',
                body,
            }),
            transformErrorResponse: transformErrorWithMessageResponse,
        }),
        resetPassword: builder.mutation<authServerResponse, resetRequest>({
            query: (body) => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.RESET_PASSWORD,
                url: ApiEndpoints.AUTH_RESET_PASSWORD,
                method: 'POST',
                body,
            }),
            transformErrorResponse,
        }),
    }),
});

export const authTokenApi = tokenApi.injectEndpoints({
    endpoints: (builder) => ({
        getRefreshToken: builder.query<void, void>({
            query: () => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.GET_REFRESH,
                url: ApiEndpoints.AUTH_GET_REFRESH,
                method: 'GET',
                credentials: 'include',
            }),
            onQueryStarted: saveAuthTokenFromHeaders(),
            transformErrorResponse,
        }),

        getCheckAuth: builder.query<void, void>({
            query: () => ({
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.GET_CHECK_AUTH,
                url: ApiEndpoints.AUTH_GET_CHECK_AUTH,
                method: 'GET',
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
