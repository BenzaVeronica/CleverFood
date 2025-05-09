import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';
import { getRandomNumber } from '~/utils/getRandomNumber';

import { useGetRecipeByIdQuery } from '../recipe/recipe.api';
import {
    AllVariantsCategory,
    GetAllSubCategoryIdsByCategoryIds,
    GetCategoryBySubCategoryId,
    GetRandomSubCategoryIdByCategory,
    GetUniqueCategoriesBySubCategoryIds,
    RootCategory,
    SubCategory,
} from './category.types';

export function getRootCategories(categoriesResponse: AllVariantsCategory[]): RootCategory[] {
    return categoriesResponse.filter((category) => 'subCategories' in category) as RootCategory[];
}
export function getSubCategories(categoriesResponse: AllVariantsCategory[]): SubCategory[] {
    return categoriesResponse.filter((category) => 'rootCategoryId' in category) as SubCategory[];
}

export function useCategoryBySubCategoryId(subCategoryId: string) {
    const { categories, subCategories } = useAppSelector(selectCategoriesWithSubs);
    return getCategoryBySubCategoryId({ categories, subCategories, subCategoryId });
    // const result = getCategoryBySubCategoryId({ categories, subCategories, subCategoryId });
    //     if (!result) return '';
    //     return `/${result.category.category}/${result.subCategory.category}/${id}`;
}
export const getCategoryBySubCategoryId: GetCategoryBySubCategoryId = ({
    categories,
    subCategories,
    subCategoryId,
}) => {
    const subCategory = subCategories.find((el) => el._id === subCategoryId);
    if (!subCategory) return null;
    const category = categories.find((el) => el._id === subCategory.rootCategoryId);
    if (!category) return null;
    return { subCategory, category };
};

// export const getFullPathBySubCategoryId: GetFullPathBySubCategoryId = ({
//     categories,
//     subCategories,
//     subCategoryId,
//     id,
// }) => {
//     const result = getCategoryBySubCategoryId({
//         categories,
//         subCategories,
//         subCategoryId,
//     });
//     if (!result) return '';
//     return `/${result.category.category}/${result.subCategory.category}/${id}`;
// };

export const getUniqueCategoriesBySubCategoryIds: GetUniqueCategoriesBySubCategoryIds = ({
    categories,
    subCategories,
    subCategoriesIds = [],
}) => {
    const withNullsCategs = subCategoriesIds.map(
        (id) =>
            getCategoryBySubCategoryId({ categories, subCategories, subCategoryId: id })?.category,
    );

    return Array.from(new Set(withNullsCategs.filter(Boolean))) as RootCategory[];
};

export const getRandomSubCategoryId = (subCategories: SubCategory[]) => {
    if (subCategories.length === 0) return null;
    const randomIndex = getRandomNumber(subCategories.length);
    return subCategories[randomIndex]._id;
};
export const getRandomSubCategoryIdByCategory: GetRandomSubCategoryIdByCategory = ({
    categories,
    categoryId,
}) => {
    const subCategoriesByCategory = categories.find(
        (cat) => cat.category === categoryId,
    )?.subCategories;
    if (!subCategoriesByCategory) return null;

    const randomIndex = getRandomNumber(subCategoriesByCategory?.length);
    return subCategoriesByCategory[randomIndex]._id;
};

function useCurrentCategories() {
    const { categoryId, subcategoryId, recipeId } = useParams();

    const { categories, subCategories } = useAppSelector(selectCategoriesWithSubs);
    const currentCategory = categories.find((cat: RootCategory) => cat.category === categoryId);
    const currentSubcategory = currentCategory?.subCategories?.find(
        (sub: SubCategory) => sub.category === subcategoryId,
    );
    const allSubCategories = subCategories.filter(
        (cat) => cat.rootCategoryId === currentCategory?._id,
    );
    const { data: currentRecipe } = useGetRecipeByIdQuery(recipeId ?? skipToken);
    return {
        currentCategory,
        currentSubcategory,
        currentRecipe,
        allSubCategories,
    };
}

export default useCurrentCategories;

// export const getAllSubCategoryIdsByCategoryId: GetAllSubCategoryIdsByCategoryId = ({
//     categories,
//     categoryId,
// }) => {
//     const subCategoriesByCategory = categories.find(
//         (cat) => cat.category === categoryId,
//     )?.subCategories;
//     if (!subCategoriesByCategory) return null;
//     return subCategoriesByCategory;
// };
export const getAllSubCategoryIdsByCategoryIds: GetAllSubCategoryIdsByCategoryIds = (
    categories,
    categoryIds,
) => {
    const ids: string[] = [];

    categoryIds.forEach((categoryId) => {
        const categoryRoot = categories.find((sub) => sub.category === categoryId);
        if (categoryRoot?.subCategories) {
            ids.push(...categoryRoot.subCategories.map((sub) => sub._id));
        }
    });

    return ids;
};
