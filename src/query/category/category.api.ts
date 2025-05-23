import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { tokenApi } from '~/query/create-api.ts';
import { initNavTree } from '~/store/category/category-slice';

import { transformErrorResponse } from '../errors/transformErrors';
import { CategoriesResponse } from './category.types';

export const categoryApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORY],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getNavTree: builder.query<CategoriesResponse, void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORY,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORY,
                    name: EndpointNames.GET_NAV_TREE,
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
                providesTags: [Tags.CATEGORY],
                transformErrorResponse: transformErrorResponse,
            }),
        }),
    });

export const { useGetNavTreeQuery } = categoryApiSlice;
