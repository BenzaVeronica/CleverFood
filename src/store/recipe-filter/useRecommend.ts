import { useRecommendRecipeByMutation } from '~/query/recipe/recipe.api';
import { useToastNotifications } from '~/utils/useToastNotifications';

import { Recipe } from './recipe.types';

export function useRecommend() {
    const [recommendRecipeBy] = useRecommendRecipeByMutation();

    const { handleServerError } = useToastNotifications();
    const toggleRecommend = async (recipeId: string | undefined, recipe: Recipe) => {
        if (!recipeId) return;
        try {
            await recommendRecipeBy({ recipeId, recipe }).unwrap();
        } catch (error) {
            handleServerError(error);
        }
    };

    return { toggleRecommend };
}
