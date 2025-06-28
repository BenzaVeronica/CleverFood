import { ApiGroups } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { EndpointUrl } from '~/query/constants/enpoint-url';
import { tokenApi } from '~/query/create-api.ts';
import { ApplicationState } from '~/store/app.types';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { setExistResult, setIsLoadingQuery } from '~/store/recipe-filter/recipe-filter-slice';
import { RecipeFormData, RecipeFormDataDraft } from '~/store/recipe-form/recipe-form-types';

import { ApiMethods } from '../constants/api-methods';
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
import { toggleBookmarkFromCache } from './recipe.cacheUtils';
import { DEFAULT_PARAMS } from './recipe.constants';
import {
    invalidateRecipeListTags,
    invalidateRecipeTags,
    invalidateRecipeTagsFromBody,
    providesRecipeTagById,
    providesRecipeTags,
    providesTagsByUserId,
} from './recipe.tags';
import {
    RecipeBookmarksResponse,
    RecipeIdAndRecipe,
    RecipeLikeResponse,
    RecipesByUserIdResponse,
    RecipesResponse,
} from './recipe.types';

export const recipesApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [ApiGroups.RECIPE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.GET_RECIPES]: builder.query<RecipesResponse, ResponseParamsOrNull>({
                query: (params = {}) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.GET_RECIPES,
                    url: EndpointUrl.RECIPE,
                    method: ApiMethods.GET,
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
                        } catch {
                            dispatch(setIsLoadingQuery(false));
                        }
                    }
                },
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
                providesTags: providesRecipeTags,
            }),
            [EndpointNames.GET_RECIPES_BY_SUBCATEGORY]: builder.query<
                RecipesResponse,
                ResponseParamsWithId
            >({
                query: ({ id, ...params }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.GET_RECIPES_BY_SUBCATEGORY,
                    url: `${EndpointUrl.RECIPE_CATEGORY}/${id}`,
                    method: ApiMethods.GET,
                    params: params,
                }),
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
            [EndpointNames.GET_RECIPE]: builder.query<Recipe, string | undefined>({
                query: (id) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.GET_RECIPE,
                    url: `${EndpointUrl.RECIPE}/${id}`,
                    method: ApiMethods.GET,
                }),
                transformResponse: transformRecipeProteinsResponse,
                transformErrorResponse: transformErrorResponse,
                providesTags: providesRecipeTagById,
            }),
            [EndpointNames.CREATE_RECIPE]: builder.mutation<Recipe, RecipeFormData>({
                query: (body) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.CREATE_RECIPE,
                    url: EndpointUrl.RECIPE,
                    method: ApiMethods.POST,
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: invalidateRecipeListTags,
            }),
            [EndpointNames.CREATE_RECIPE_DRAFT]: builder.mutation<
                ResponseData,
                RecipeFormDataDraft
            >({
                query: (body) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.CREATE_RECIPE_DRAFT,
                    url: EndpointUrl.RECIPE_DRAFT,
                    method: ApiMethods.POST,
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: invalidateRecipeListTags,
            }),
            [EndpointNames.UPDATE_RECIPE]: builder.mutation<
                ResponseData,
                { id: string; data: RecipeFormData }
            >({
                query: ({ id, data }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.UPDATE_RECIPE,
                    url: `/recipe/${id}`,
                    method: ApiMethods.PATCH,
                    body: data,
                }),
                invalidatesTags: invalidateRecipeTagsFromBody,
            }),
            [EndpointNames.UPDATE_RECIPE_DRAFT]: builder.mutation<
                ResponseData,
                { id: string; data: RecipeFormDataDraft }
            >({
                query: ({ id, data }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.UPDATE_RECIPE_DRAFT,
                    url: `${EndpointUrl.RECIPE_DRAFT}/${id}`,
                    method: ApiMethods.PATCH,
                    credentials: 'include',
                    body: data,
                }),
                invalidatesTags: invalidateRecipeListTags,
            }),
            [EndpointNames.DELETE_RECIPE]: builder.mutation<ResponseData, string>({
                query: (id) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.DELETE_RECIPE,
                    url: `/recipe/${id}`,
                    method: ApiMethods.DELETE,
                }),
                invalidatesTags: invalidateRecipeListTags,
            }),
            [EndpointNames.LIKE_RECIPE]: builder.mutation<RecipeLikeResponse, RecipeIdAndRecipe>({
                query: ({ recipeId }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.LIKE_RECIPE,
                    url: `/recipe/${recipeId}/like`,
                    method: ApiMethods.POST,
                }),
                invalidatesTags: invalidateRecipeTags,
            }),
            [EndpointNames.BOOKMARK_RECIPE]: builder.mutation<
                RecipeBookmarksResponse,
                RecipeIdAndRecipe
            >({
                query: ({ recipeId }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.BOOKMARK_RECIPE,
                    url: `/recipe/${recipeId}/bookmark`,
                    method: ApiMethods.POST,
                }),
                onQueryStarted: toggleBookmarkFromCache,
            }),
            [EndpointNames.RECOMMEND_RECIPE]: builder.mutation<void, RecipeIdAndRecipe>({
                query: ({ recipeId }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.RECOMMEND_RECIPE,
                    url: `/recipe/recommend/${recipeId}`,
                    method: ApiMethods.POST,
                }),
                invalidatesTags: invalidateRecipeTags,
            }),
            [EndpointNames.GET_RECIPES_BY_USER]: builder.query<
                RecipesByUserIdResponse,
                RequestParamsUserId
            >({
                query: ({ userId }) => ({
                    apiGroupName: ApiGroups.RECIPE,
                    name: EndpointNames.GET_RECIPES_BY_USER,
                    url: `${EndpointUrl.RECIPE_USER}/${userId}`,
                    method: ApiMethods.GET,
                }),
                transformErrorResponse: transformErrorResponse,
                providesTags: providesTagsByUserId,
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
    useRecommendRecipeByMutation,
    useUpdateRecipeDraftMutation,
} = recipesApiSlice;
