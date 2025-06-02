import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import FormRecipe from '~/components/FormRecipe/FormRecipe';
import LoaderScreen from '~/components/UI/Loader/LoaderScreen';
import { useGetRecipeByIdQuery } from '~/query/recipe/recipe.api';
import { useRedirectInvalidPath } from '~/routes/useRedirectInvalidPath';

export function RecipeCreateEditPage() {
    const { categoryId, subcategoryId, recipeId } = useParams();
    useRedirectInvalidPath();

    const { data: currentRecipe, isLoading } = useGetRecipeByIdQuery(recipeId ?? skipToken);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId, subcategoryId, recipeId]);

    return (
        <>
            {isLoading && <LoaderScreen />}
            <FormRecipe recipeId={recipeId} initialData={recipeId ? currentRecipe : null} />
        </>
    );
}
