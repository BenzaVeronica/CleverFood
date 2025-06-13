import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetNavTreeQuery } from '~/query/category/category.api';
import { useGetRecipeByIdQuery } from '~/query/recipe/recipe.api';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';

import { PageRoutes } from './PageRoutes.constants';

export function useRedirectInvalidPath() {
    const { categoryId, subcategoryId, recipeId } = useParams();
    const navigate = useNavigate();

    const { isLoading } = useGetNavTreeQuery();
    const { categories, subCategories } = useAppSelector(selectCategoriesWithSubs);
    const category = categories.find((cat) => cat.category === categoryId);
    const subcategory = subCategories.find((sub) => sub.category === subcategoryId);
    const { data: recipe, isLoading: isLoadingRecipe } = useGetRecipeByIdQuery(
        recipeId ?? skipToken,
    );

    useEffect(() => {
        if (isLoading) return;
        const isNotValidCat = categoryId && !category;
        const isNotValidSub = subcategoryId && !subcategory;
        const isNotValidRecipe = subcategoryId && !subcategory;
        if (isNotValidCat || isNotValidSub || isNotValidRecipe) {
            navigate(PageRoutes.NOT_FOUND, { replace: true });
        }
    }, [isLoadingRecipe, isLoading]);

    return {
        category,
        subcategory,
        recipe,
    };
}
