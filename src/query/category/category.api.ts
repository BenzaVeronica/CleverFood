import { ApiGroups } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { EndpointUrl } from '~/query/constants/enpoint-url';
import { tokenApi } from '~/query/create-api.ts';
import { initNavTree } from '~/store/category/category-slice';

import { ApiMethods } from '../constants/api-methods';
import { transformErrorResponse } from '../errors/transformErrors';
import { CategoriesResponse } from './category.types';

export const categoryApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [EndpointUrl.CATEGORY],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.GET_NAV_TREE]: builder.query<CategoriesResponse, void>({
                query: () => ({
                    apiGroupName: ApiGroups.CATEGORY,
                    name: EndpointNames.GET_NAV_TREE,
                    url: EndpointUrl.CATEGORY,
                    method: ApiMethods.GET,
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(initNavTree(data));
                        // setDataToLocalStorage('tree', data);
                    } catch (_error: unknown) {
                        // const fallbackData = getDataFromLocalStorage('tree');
                        // if (fallbackData) return fallbackData;
                    }
                },
                providesTags: [EndpointUrl.CATEGORY],
                transformErrorResponse: transformErrorResponse,
            }),
        }),
    });

export const { useGetNavTreeQuery } = categoryApiSlice;
