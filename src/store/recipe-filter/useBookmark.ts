import { useBookmarkRecipeByMutation } from '~/query/recipe/recipe.api';
import { useToastNotifications } from '~/utils/useToastNotifications';

import { Recipe } from './recipe.types';

export function useBookmark(recipeId: string | undefined, recipe: Recipe) {
    const [bookmarkRecipeBy] = useBookmarkRecipeByMutation();

    const { handleServerError } = useToastNotifications();
    const toggleBookmark = async () => {
        if (!recipeId) return;
        try {
            await bookmarkRecipeBy({ recipeId, recipe }).unwrap();
        } catch (error) {
            handleServerError(error);
        }
    };

    return { toggleBookmark };
}
