import { createSelector } from '@reduxjs/toolkit';

import type { ApplicationState } from '../configure-store';
import { RecipeFilterState } from './recipe-filter-slice';

export const selectSearch = createSelector(
    [
        (state: ApplicationState) => state.recipeFilter.isSearchActive,
        (state: ApplicationState) => state.recipeFilter.searchQuery,
    ],
    (isSearchActive, searchQuery) => ({
        isSearchActive,
        searchQuery,
    }),
);
export const selectRecipeFilter = (state: ApplicationState): RecipeFilterState =>
    state.recipeFilter;

export const selectDisabledAllergenSwitch = (state: ApplicationState): boolean =>
    state.recipeFilter.isDisabledAllergenSwitch;
export const selectAllergens = (state: ApplicationState): string[] => state.recipeFilter.allergens;
