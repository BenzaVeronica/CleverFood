import { createSelector } from '@reduxjs/toolkit';

import type { ApplicationState } from '../configure-store';
import { MAS_RECIPES } from './recipe.constants';
import { recipe } from './recipe.types';
import { RecipeFilterState } from './recipe-filter-slice';

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
// export const selectMeat = (state: ApplicationState) => state.recipeFilter.meatTypes;
// export const selectSide = (state: ApplicationState) => state.recipeFilter.side;

type typeRecipeFilterStateOnlyFilters = Omit<RecipeFilterState, 'isSearchActive'>;
export const selectActiveFilters = (state: ApplicationState): typeRecipeFilterStateOnlyFilters => {
    const filter = state.recipeFilter;
    return {
        searchQuery: filter.searchQuery,
        currentCategory: filter.currentCategory,
        categories: filter.categories,
        author: filter.author,
        allergens: filter.allergens,
        meatTypes: filter.meatTypes,
        sideDishes: filter.sideDishes,
        isFilter: filter.isFilter,
    };
};
export const selectRecipes = (): recipe[] => MAS_RECIPES;

const selectRecipesList = createSelector([selectRecipes], (recipes) => recipes.map((r) => r));

export type typeSelectFilteredRecipes = {
    filteredList: recipe[];
    isFilter: boolean;
    filters: typeRecipeFilterStateOnlyFilters;
    // filters: ReturnType<typeof selectActiveFilters>;
};
export const selectFilteredRecipes = createSelector(
    [selectRecipesList, selectActiveFilters],
    (list, filters): typeSelectFilteredRecipes => {
        // console.log(filters.isFilter);
        if (!filters.isFilter && !filters.currentCategory)
            return { filteredList: list, isFilter: filters.isFilter, filters };
        const filteredList = list.filter((recipe) => {
            if (filters.searchQuery && !recipe.title.toLowerCase().includes(filters.searchQuery)) {
                // if (filters.searchQuery && !recipe.title.includes(filters.searchQuery)) {
                return false;
            }
            if (
                filters.categories.length &&
                !recipe.category?.some((c) => filters.categories.includes(c))
            ) {
                // if(filters.currentCategory){
                //     const index = recipe.category.findIndex(el=>el===filters.currentCategory);
                //     recipe.subcategory[index]
                //     !recipe.subcategory?.some((c) => filters.categories.includes(c))
                // return false;
                // }
                return false;
            }
            if (filters.meatTypes.length) {
                if (!recipe.meat) return false;
                if (!filters.meatTypes.includes(recipe.meat)) return false;
            }
            if (filters.sideDishes.length) {
                if (!recipe.side) return false;
                if (!filters.sideDishes.includes(recipe.side)) return false;
            }
            if (
                filters.allergens.length &&
                recipe.ingredients?.some((ingred) =>
                    filters.allergens.some((allergen) => {
                        const lowerIngredient = ingred.title.toLowerCase();
                        const lowerAllergen = allergen.toLowerCase();
                        for (let i = 0; i <= lowerAllergen.length - 3; i++) {
                            if (lowerIngredient.includes(lowerAllergen.substr(i, 3))) {
                                return true;
                            }
                        }

                        return false;
                        // filters.allergens.includes(ingred.title.toLowerCase()),
                        // return ingred.title.toLowerCase().includes(allergen.toLowerCase());
                    }),
                )
            ) {
                return false;
            }
            return true;
        });
        // console.log(filters);
        // console.log(filteredList);
        return { filteredList, isFilter: filters.isFilter, filters };
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

        // if (filters.sideDishes.length) {
        //     result = result.filter((recipe) => recipe.side && filters.sideDishes.includes(recipe.side));
        // }

        // if (filters.meatTypes.length) {
        //     result = result.filter((recipe) => recipe.meat && filters.meatTypes.includes(recipe.meat));
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
