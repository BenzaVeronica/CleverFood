import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormValues } from '~/components/DrawerFilter/DrawerFilterForm';

import { ApplicationState } from '../configure-store';
import { hasAnyFilter } from './utils';
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
    categories: string[];
    author: string[];
    isDisabledAllergenSwitch: boolean;
    allergens: string[];
    meatTypes: string[];
    sideDishes: string[];
    isLoadingQuery: boolean;
    resultLength: number | null;
    // isLoaderSearch: boolean;
};
const initialState: RecipeFilterState = {
    // search: {
    // searchQuery: '',
    // isSearchActive: false,
    // },
    // isLoadingQuery: true,
    // isFilter: true,
    isLoadingQuery: false,
    isFilter: false,
    searchQuery: '',
    isSearchActive: false,
    categories: [],
    author: [],
    isDisabledAllergenSwitch: true,
    allergens: [],
    meatTypes: [],
    sideDishes: [],
    resultLength: null,
    // isLoaderSearch: false,
};
export const recipeFilterSlice = createSlice({
    name: 'recipeFilter',
    initialState,
    reducers: {
        // setSearch: (state, { payload }: PayloadAction<RecipeSearch>) => {
        //     state.search = payload;
        // },
        setSearchQuery: (state, { payload }: PayloadAction<string>) => {
            state.searchQuery = payload;
            // state.searchQuery = payload;
            if (state.searchQuery) {
                state.isFilter = true;
            }
        },
        toggleSearchDisabledAllergenSwitch: (state) => {
            state.isDisabledAllergenSwitch = !state.isDisabledAllergenSwitch;
            if (state.isDisabledAllergenSwitch) {
                state.allergens = [];
            }
        },
        setSearchDisabledAllergenSwitch: (state, { payload }: PayloadAction<boolean>) => {
            state.isDisabledAllergenSwitch = payload;
        },
        setSearchActive: (state, { payload }: PayloadAction<boolean>) => {
            state.isSearchActive = payload;
        },
        setAllergens: (state, action: PayloadAction<string[]>) => {
            if (action.payload.length) {
                state.allergens = action.payload;
                // state.isFilter = true;
            } else {
                // state.isFilter = hasAnyFilter(state);
            }
        },
        // setLoaderSearch: (state, { payload }: PayloadAction<boolean>) => {
        // state.isLoaderSearch = payload;
        // },
        setAllFilter: (state, action: PayloadAction<FormValues>) => {
            const { categories, author, allergens, meatTypes, sideDishes } = action.payload;
            state.categories = categories;
            // state.subCategories = getSubCategories(categories);
            state.author = author;
            state.allergens = allergens;
            state.meatTypes = meatTypes;
            state.sideDishes = sideDishes;
            state.isFilter = true;
            // state.isLoaderSearch = false;
        },
        setIsFilter: (state, { payload }: PayloadAction<boolean>) => {
            state.isFilter = payload;
        },
        setIsLoadingQuery: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoadingQuery = payload;
        },
        setResultLength: (state, { payload }: PayloadAction<number>) => {
            state.resultLength = payload;
            if (payload === 0) {
                state.isFilter = false;
                state.searchQuery = '';
            }
        },
        resetFilters: (_state) => ({
            ...initialState,
        }),

        removeCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((item) => item !== action.payload);
        },
        removeAuthor: (state, action: PayloadAction<string>) => {
            state.author = state.author.filter((item) => item !== action.payload);
        },
        removeAllergen: (state, action: PayloadAction<string>) => {
            state.allergens = state.allergens.filter((item) => item !== action.payload);
            state.isFilter = hasAnyFilter(state);
        },
        removeMeatType: (state, action: PayloadAction<string>) => {
            state.meatTypes = state.meatTypes.filter((item) => item !== action.payload);
        },
        removeSideDish: (state, action: PayloadAction<string>) => {
            state.sideDishes = state.sideDishes.filter((item) => item !== action.payload);
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const {
    removeCategory,
    removeAuthor,
    removeAllergen,
    removeMeatType,
    removeSideDish,
    setSearchQuery,
    setSearchActive,
    setAllergens,
    setAllFilter,
    setIsFilter,
    resetFilters,
    setIsLoadingQuery,
    setResultLength,
    setSearchDisabledAllergenSwitch,
    toggleSearchDisabledAllergenSwitch,
} = recipeFilterSlice.actions;
export default recipeFilterSlice.reducer;
