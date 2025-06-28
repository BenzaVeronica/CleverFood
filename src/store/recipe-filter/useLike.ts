import { useLikeRecipeByMutation } from '~/query/recipe/recipe.api';
import { useToastNotifications } from '~/utils/useToastNotifications';

import { Recipe } from './recipe.types';

export function useLike(recipeId: string | undefined, recipe: Recipe) {
    const [likeRecipeBy] = useLikeRecipeByMutation();

    const { handleServerError } = useToastNotifications();
    const toggleLike = async () => {
        if (!recipeId) return;
        try {
            await likeRecipeBy({ recipeId, recipe }).unwrap();
        } catch (error) {
            handleServerError(error);
        }
    };

    return { toggleLike };
}
