import { useBookmarkRecipeByMutation } from '~/query/recipe/recipe.api';
import { useGeneralServerError } from '~/utils/useGeneralServerError';

export function useBookmark(recipeId: string | undefined) {
    const [bookmarkRecipeBy] = useBookmarkRecipeByMutation();

    const { handleServerError } = useGeneralServerError();
    const toggleBookmark = async () => {
        if (!recipeId) return;
        try {
            await bookmarkRecipeBy(recipeId).unwrap();
        } catch (error) {
            handleServerError(error);
        }
    };

    return { toggleBookmark };
}
