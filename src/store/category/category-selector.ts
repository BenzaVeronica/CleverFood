import { createSelector } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

export const selectNavTree = (state: ApplicationState) => state.category.tree;
export const selectCategories = (state: ApplicationState) => state.category.categories;
export const selectCategoryById = (id: string | null) =>
    createSelector([selectCategories], (categories) => {
        if (!id) return null;
        return categories.find((el) => el._id === id);
    });
export const selectSubCategories = (state: ApplicationState) => state.category.subCategories;
export const selectSubCategoriesOptions = createSelector([selectSubCategories], (subCategories) =>
    subCategories.map((sub) => ({
        id: sub._id,
        label: sub.title,
    })),
);

export const selectCategoriesWithSubs = createSelector(
    [
        (state: ApplicationState) => state.category.categories,
        (state: ApplicationState) => state.category.subCategories,
    ],
    (categories, subCategories) => ({
        categories,
        subCategories,
    }),
);

export const selectCategoryBySubCategoryId = (subCategoryId: string | null) =>
    createSelector([selectCategories, selectSubCategories], (categories, subCategories) => {
        if (!subCategoryId) return null;
        const subCategory = subCategories.find((el) => el._id === subCategoryId);
        if (!subCategory) return null;
        const category = categories.find((el) => el._id === subCategory.rootCategoryId);
        if (!category) return null;
        return category;
    });
