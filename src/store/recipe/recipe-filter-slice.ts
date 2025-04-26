import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormValues } from '~/components/DrawerFilter/DrawerFilterForm';

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
    categories: string[];
    author: string[];
    allergens: string[];
    meatTypes: string[];
    sideDishes: string[];
    currentCategory: string;
    // currentSubCategory: string;
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
    categories: [],
    author: [],
    allergens: [],
    meatTypes: [],
    sideDishes: [],
    currentCategory: '',
    // currentSubCategory: '',
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
            // state.searchQuery = payload;
            if (state.searchQuery) {
                state.isFilter = true;
            }
        },
        setSearchActive: (state, { payload }: PayloadAction<boolean>) => {
            state.isSearchActive = payload;
        },
        setCategory: (state, action: PayloadAction<string[]>) => {
            if (state.currentCategory) {
                state.categories = [state.currentCategory, ...action.payload];
            } else {
                state.categories = action.payload;
            }
            state.isFilter = true;
        },
        setCurrentCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;

            if (!category) {
                state.currentCategory = '';
                return;
            }
            // if (state.categories.indexOf(category) !== -1) {
            //   state.categories = state.categories.filter((c) => c !== category);
            // } else {
            //   state.categories = [...state.categories, category];
            // }

            state.categories = [...state.categories, category];
            state.currentCategory = category;
        },
        setAllergens: (state, action: PayloadAction<string[]>) => {
            state.allergens = action.payload;
            state.isFilter = true;
        },
        setAllFilter: (state, action: PayloadAction<FormValues>) => {
            state.categories = action.payload.categories;
            state.author = action.payload.author;
            state.allergens = action.payload.allergens;
            state.meatTypes = action.payload.meatTypes;
            state.sideDishes = action.payload.sideDishes;
            state.isFilter = true;
        },
        // setMeat: (state, action: PayloadAction<string[]>) => {
        //     state.meatTypes = action.payload;
        // },
        // setSide: (state, action: PayloadAction<string[]>) => {
        //     state.sideDishes = action.payload;
        // },
        setIsFilter: (state, { payload }: PayloadAction<boolean>) => {
            state.isFilter = payload;
        },
        resetFilters: (state) => ({
            ...initialState,
            currentCategory: state.currentCategory,
        }),
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;

export const {
    setSearchQuery,
    setSearchActive,
    setCategory,
    setCurrentCategory,
    setAllergens,
    setAllFilter,
    setIsFilter,
    resetFilters,
} = recipeFilterSlice.actions;
export default recipeFilterSlice.reducer;
