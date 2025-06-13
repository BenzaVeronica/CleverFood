import { useLikeRecipeByMutation } from '~/query/recipe/recipe.api';
import { useGeneralServerError } from '~/utils/useGeneralServerError';

export function useLike(recipeId: string | undefined) {
    const [likeRecipeBy] = useLikeRecipeByMutation();

    const { handleServerError } = useGeneralServerError();
    const toggleLike = async () => {
        if (!recipeId) return;
        try {
            await likeRecipeBy(recipeId).unwrap();
        } catch (error) {
            handleServerError(error);
        }
    };

    return { toggleLike };
}
