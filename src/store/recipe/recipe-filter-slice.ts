import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';
export type AppState = typeof initialState;

// type RecipeSearch = {
//     searchQuery: string;
//     isSearchActive: boolean;
// };
export type RecipeFilterState = {
    // search: RecipeSearch;
    isFilter: boolean;
    isSearchActive: boolean;
    searchQuery: string;
    category: string[];
    allergens: string[];
    meat: string[];
    side: string[];
};
const initialState: RecipeFilterState = {
    // search: {
    // searchQuery: '',
    // isSearchActive: false,
    // },
    isFilter: false,
    searchQuery: '',
    isSearchActive: false,
    // searchQuery: 'карт',
    // isSearchActive: true,
    category: [],
    allergens: [],
    meat: [],
    side: [],
};
export const recipeFilterSlice = createSlice({
    name: 'recipeFilter',
    initialState,
    reducers: {
        // setSearch: (state, { payload }: PayloadAction<RecipeSearch>) => {
        //     state.search = payload;
        // },
        setSearchQuery: (state, { payload }: PayloadAction<string>) => {
            state.searchQuery = payload.toLowerCase();
            state.isFilter = true;
        },
        setSearchActive: (state, { payload }: PayloadAction<boolean>) => {
            state.isSearchActive = payload;
        },
        setCategory: (state, action: PayloadAction<string[]>) => {
            state.category = action.payload;
            state.isFilter = true;
        },
        setAllergens: (state, action: PayloadAction<string[]>) => {
            state.allergens = action.payload;
            state.isFilter = true;
        },
        setAllFilter: (state, action: PayloadAction<Omit<RecipeFilterState, 'search'>>) => {
            state.category = action.payload.category;
            state.allergens = action.payload.allergens;
            state.meat = action.payload.meat;
            state.side = action.payload.side;
            state.isFilter = true;
        },
        // setMeat: (state, action: PayloadAction<string[]>) => {
        //     state.meat = action.payload;
        // },
        // setSide: (state, action: PayloadAction<string[]>) => {
        //     state.side = action.payload;
        // },
        resetFilters: () => initialState,

        // setAppError(state, { payload: error }: PayloadAction<string | null>) {
        //     state.error = error;
        // },
        // setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
        //     state.isLoading = isLoading;
        // },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const {
    setSearchQuery,
    setSearchActive,
    setCategory,
    setAllergens,
    setAllFilter,
    resetFilters,
} = recipeFilterSlice.actions;
export default recipeFilterSlice.reducer;
