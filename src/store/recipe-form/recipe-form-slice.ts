import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeFormDataDraft } from './recipe-form-types';

export type AppState = typeof initialState;

export const getRecipeEmptyForm = (): RecipeFormDataDraft => ({
    title: '',
    description: null,
    image: null,
    time: null,
    categoriesIds: [],
    portions: null,
    steps: [
        {
            stepNumber: 1,
            description: null,
            image: null,
        },
    ],
    ingredients: [
        {
            title: null,
            count: null,
            measureUnit: null,
        },
    ],
});

export type RecipeFormState = {
    hasChanges: boolean;
    form: RecipeFormDataDraft | null;
    emptyForm: RecipeFormDataDraft;
};
const initialState: RecipeFormState = {
    hasChanges: false,
    form: null,
    emptyForm: getRecipeEmptyForm(),
};
export const recipeFormSlice = createSlice({
    name: 'recipeForm',
    initialState,
    reducers: {
        markAsDirty: (state) => {
            if (!state.hasChanges) {
                state.hasChanges = true;
            }
        },
        saveFormSnapshot: (state, action: PayloadAction<RecipeFormDataDraft>) => {
            state.form = action.payload;
        },
        resetRecipeForm: (state) => {
            state.hasChanges = false;
            state.form = null;
        },
    },
});

export const { markAsDirty, saveFormSnapshot, resetRecipeForm } = recipeFormSlice.actions;
export default recipeFormSlice.reducer;
