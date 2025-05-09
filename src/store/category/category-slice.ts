import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AllVariantsCategory, RootCategory, SubCategory } from '~/query/category/category.types';
import { getRootCategories, getSubCategories } from '~/query/category/category.utils';

export type AppState = typeof initialState;

export type CategoryState = {
    tree: AllVariantsCategory[];
    categories: RootCategory[];
    subCategories: SubCategory[];
};
const initialState: CategoryState = {
    tree: [],
    categories: [],
    subCategories: [],
};
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        initNavTree: (state, action: PayloadAction<AllVariantsCategory[]>) => {
            state.tree = action.payload;
            state.categories = getRootCategories(action.payload);
            state.subCategories = getSubCategories(action.payload);
        },
        resetState: () => ({
            ...initialState,
        }),
    },
});

export const { initNavTree } = categorySlice.actions;
export default categorySlice.reducer;
