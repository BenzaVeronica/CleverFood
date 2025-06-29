import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import FormRecipe from '~/components/FormRecipe/FormRecipe';
import { LoaderScreen } from '~/components/UI/Loader/LoaderScreen';
import { useGetRecipeByIdQuery } from '~/query/recipe/recipe.api';
import { useRedirectInvalidPath } from '~/routes/useRedirectInvalidPath';
import { getCurrentDraft } from '~/store/recipe-filter/recipe.utils';

export default function RecipeCreateEditPage() {
    const { categoryId, subcategoryId, recipeId, draftId } = useParams();
    useRedirectInvalidPath();

    const { data: currentRecipe, isLoading } = useGetRecipeByIdQuery(recipeId ?? skipToken);
    const currentDraft = getCurrentDraft(draftId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryId, subcategoryId, recipeId]);

    if (draftId) {
        return (
            <>
                {isLoading && <LoaderScreen />}
                <FormRecipe recipeId={recipeId} initialData={currentDraft} draftId={draftId} />
            </>
        );
    }
    return (
        <>
            {isLoading && <LoaderScreen />}
            <FormRecipe recipeId={recipeId} initialData={recipeId ? currentRecipe : null} />
        </>
    );
}
