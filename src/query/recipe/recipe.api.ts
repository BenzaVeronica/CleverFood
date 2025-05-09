import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { publicApi } from '~/query/create-api.ts';
import { ApplicationState } from '~/store/configure-store';
import { recipe } from '~/store/recipe/recipe.types';
import { setIsLoadingQuery, setResultLength } from '~/store/recipe/recipe-filter-slice';

import { DEFAULT_PARAMS } from '../api.constants';
import {
    transformErrorResponse,
    transformRecipeProteinsResponse,
    transformRecipesProteinsResponse,
} from '../api.utils';
import { ResponseParamsOrNull, ResponseParamsWithId } from '../types';
import { RecipesResponse } from './recipe.types';

export const recipesApiSlice = publicApi
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<RecipesResponse, ResponseParamsOrNull>({
                // NOTE: удалить
                // queryFn: getRecipesMock,
                query: (params = {}) => ({
                    url: ApiEndpoints.RECIPE,
                    // url: 'd',
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPES,
                    params: {
                        ...DEFAULT_PARAMS,
                        ...params,
                    },
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
                    const state = getState() as ApplicationState;
                    const isFilter = state.recipeFilter?.isFilter;

                    if (isFilter) {
                        try {
                            dispatch(setIsLoadingQuery(true));
                            const { data } = await queryFulfilled;
                            dispatch(setResultLength(data.meta.total));
                            dispatch(setIsLoadingQuery(false));
                        } catch (_error: unknown) {
                            dispatch(setIsLoadingQuery(false));
                        }
                    }
                },
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
            getRecipesBySubcategoryId: builder.query<RecipesResponse, ResponseParamsWithId>({
                query: ({ id, ...params }) => ({
                    url: `${ApiEndpoints.RECIPE_CATEGORY}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPES_BY_SUBCATEGORY,
                    params: params,
                }),
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
            getRecipeById: builder.query<recipe, string | undefined>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPE,
                }),
                transformResponse: transformRecipeProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
            // getTheMostRecipes: builder.query<RecipesResponse, number>({
            //     query: (page = 1) => ({
            //         url: ApiEndpoints.RECIPE,
            //         method: 'GET',
            //         apiGroupName: ApiGroupNames.RECIPE,
            //         name: EndpointNames.GET_THE_MOST_RECIPE,
            //         params: {
            //             page: page,
            //             limit: 8,
            //             sortBy: 'likes',
            //             sortOrder: 'desc',
            //         },
            //     }),
            // }),
        }),
    });

export const { useGetRecipesQuery, useGetRecipesBySubcategoryIdQuery, useGetRecipeByIdQuery } =
    recipesApiSlice;
