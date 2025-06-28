import { AppDispatch } from '~/store/app.types';

export type ResponseData = {
    statusCode: number;
    message: string;
};

export type OptionType = {
    id: string;
    label: string;
};

export type MongoEntity = {
    _id: string;
    createdAt: string;
};

export type MetaType = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
export interface ItemResponse<T> {
    data: T;
    meta: MetaType;
}

export interface ResponseParams {
    limit: number;
    page?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    allergens?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    searchString?: string;
}
export type ResponseParamsOrNull = Partial<ResponseParams> | null | undefined | void;
export type ResponseParamsWithId = {
    id: string;
} & ResponseParams;
export type ResponseParamsWithOptionalId = {
    id?: string;
} & ResponseParams;

export type RequestParamsUserId = {
    userId: string;
};

export type MutationApi<Result> = {
    dispatch: AppDispatch;
    queryFulfilled: Promise<{ data: Result }>;
    // getState: () => RootState;
};

// const endpoint = recipesApiSlice.endpoints.getRecipesByUserId.select(userId)(getState() as any);
//     recipesApiSlice.util.updateQueryData(
//         EndpointNames.GET_RECIPES_BY_USER,
//         { userId },
//         (draft) => {
// const state = getState();
// console.log('state:', state);
