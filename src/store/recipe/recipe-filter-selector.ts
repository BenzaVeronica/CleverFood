import { createSelector } from '@reduxjs/toolkit';

import type { ApplicationState } from '../configure-store';
import { MAS_RECIPES } from './recipe.constants';
import { recipe } from './recipe.types';

// export const selectSearch = (state: ApplicationState) => state.recipeFilter.search;
// export const selectSearch = (state: ApplicationState) => ({
//     isSearchActive: state.recipeFilter.isSearchActive,
//     searchQuery: state.recipeFilter.searchQuery,
// });
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
// export const selectCategory = (state: ApplicationState) => state.recipeFilter.category;
// export const selectAllergens = (state: ApplicationState) => state.recipeFilter.allergens;
// export const selectMeat = (state: ApplicationState) => state.recipeFilter.meat;
// export const selectSide = (state: ApplicationState) => state.recipeFilter.side;

export const selectActiveFilters = (state: ApplicationState) => {
    const filter = state.recipeFilter;
    return {
        searchQuery: filter.searchQuery,
        category: filter.category,
        allergens: filter.allergens,
        meat: filter.meat,
        side: filter.side,
        isFilter: filter.isFilter,
    };
};
export const selectRecipesList = (): recipe[] => MAS_RECIPES;
export type typeSelectFilteredRecipes = {
    filteredList: recipe[];
    isFilter: boolean;
};
export const selectFilteredRecipes = createSelector(
    [selectRecipesList, selectActiveFilters],
    (list, filters): typeSelectFilteredRecipes => {
        if (!filters.isFilter) return { filteredList: list, isFilter: filters.isFilter };

        const filteredList = list.filter((recipe) => {
            if (filters.searchQuery && !recipe.title.toLowerCase().includes(filters.searchQuery)) {
                return false;
            }
            if (
                filters.category.length &&
                !recipe.category?.some((c) => filters.category.includes(c))
            ) {
                return false;
            }
            if (filters.meat.length && recipe.meat && filters.meat.includes(recipe.meat)) {
                return false;
            }
            if (filters.side.length && recipe.side && filters.side.includes(recipe.side)) {
                return false;
            }
            if (
                filters.allergens.length &&
                recipe.ingredients?.some((ingred) =>
                    filters.allergens.includes(ingred.title.toLowerCase()),
                )
            ) {
                return false;
            }
            return true;
        });
        return { filteredList, isFilter: filters.isFilter };
        //Создаётся несколько массивов, больше памяти.
        //поэтапного сокращения массива
        // let result = [...list];
        // if (filters.searchQuery) {
        //     result = result.filter((recipe) =>
        //         recipe.title.toLowerCase().includes(filters.searchQuery),
        //     );
        // }

        // if (filters.category.length) {
        //     result = result.filter((recipe) =>
        //         recipe.category?.some((c) => filters.category.includes(c)),
        //     );
        // }

        // if (filters.side.length) {
        //     result = result.filter((recipe) => recipe.side && filters.side.includes(recipe.side));
        // }

        // if (filters.meat.length) {
        //     result = result.filter((recipe) => recipe.meat && filters.meat.includes(recipe.meat));
        // }

        // if (filters.allergens.length) {
        //     result = result.filter(
        //         (recipe) =>
        //             !recipe.ingredients?.some((ingred) =>
        //                 filters.allergens.includes(ingred.title.toLowerCase()),
        //             ),
        //     );
        // }

        // return result;
    },
);
