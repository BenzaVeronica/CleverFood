import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { tokenApi } from '~/query/create-api.ts';
import { ApplicationState } from '~/store/configure-store';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { setExistResult, setIsLoadingQuery } from '~/store/recipe-filter/recipe-filter-slice';
import { RecipeFormData, RecipeFormDataDraft } from '~/store/recipe-form/recipe-form-types';

import {
    transformErrorResponse,
    transformRecipeProteinsResponse,
    transformRecipesProteinsResponse,
} from '../errors/transformErrors';
import {
    RequestParamsUserId,
    ResponseData,
    ResponseParamsOrNull,
    ResponseParamsWithId,
} from '../types';
import { DEFAULT_PARAMS } from './recipe.constants';
import {
    invalidateRecipeListTags,
    invalidateRecipeTags,
    invalidateRecipeTagsFromBody,
    LIST_TAG,
    providesRecipeTagById,
    providesRecipeTags,
} from './recipe.tags';
import {
    RecipeBookmarksResponse,
    RecipeLikeResponse,
    RecipesByUserIdResponse,
    RecipesResponse,
} from './recipe.types';

export const recipesApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<RecipesResponse, ResponseParamsOrNull>({
                query: (params = {}) => ({
                    url: ApiEndpoints.RECIPE,
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
                            dispatch(setExistResult(data.meta.total));
                            dispatch(setIsLoadingQuery(false));
                        } catch (_error: unknown) {
                            dispatch(setIsLoadingQuery(false));
                        }
                    }
                },
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
                providesTags: providesRecipeTags,
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
            getRecipeById: builder.query<Recipe, string | undefined>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPE,
                }),
                transformResponse: transformRecipeProteinsResponse,
                transformErrorResponse: transformErrorResponse,
                providesTags: providesRecipeTagById,
            }),
            createRecipe: builder.mutation<Recipe, RecipeFormData>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPE,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.CREATE_RECIPE,
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: (_result: unknown, error: unknown) => (error ? [] : LIST_TAG),
            }),
            createRecipeDraft: builder.mutation<ResponseData, RecipeFormDataDraft>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.CREATE_RECIPE_DRAFT,
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: invalidateRecipeListTags,
            }),
            updateRecipe: builder.mutation<ResponseData, { id: string; data: RecipeFormData }>({
                query: ({ id, data }) => ({
                    url: `/recipe/${id}`,
                    method: 'PATCH',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.UPDATE_RECIPE,
                    body: data,
                }),
                invalidatesTags: invalidateRecipeTagsFromBody,
            }),
            deleteRecipe: builder.mutation<ResponseData, string>({
                query: (id) => ({
                    url: `/recipe/${id}`,
                    method: 'DELETE',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.DELETE_RECIPE,
                }),
                invalidatesTags: invalidateRecipeListTags,
            }),
            likeRecipeBy: builder.mutation<RecipeLikeResponse, string>({
                query: (recipeId) => ({
                    url: `/recipe/${recipeId}/like`,
                    method: 'post',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.LIKE_RECIPE,
                }),
                invalidatesTags: invalidateRecipeTags,
            }),
            bookmarkRecipeBy: builder.mutation<RecipeBookmarksResponse, string>({
                query: (recipeId) => ({
                    url: `/recipe/${recipeId}/bookmark`,
                    method: 'post',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.BOOKMARK_RECIPE,
                }),
                invalidatesTags: invalidateRecipeTags,
            }),
            getRecipesByUserId: builder.query<RecipesByUserIdResponse, RequestParamsUserId>({
                query: ({ userId }) => ({
                    url: `${ApiEndpoints.RECIPE_USER}/${userId}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPES_BY_USER,
                }),
                transformErrorResponse: transformErrorResponse,
                // providesTags: providesRecipeTags,
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetRecipesBySubcategoryIdQuery,
    useGetRecipeByIdQuery,
    useGetRecipesByUserIdQuery,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useCreateRecipeDraftMutation,
    useLikeRecipeByMutation,
    useBookmarkRecipeByMutation,
} = recipesApiSlice;
