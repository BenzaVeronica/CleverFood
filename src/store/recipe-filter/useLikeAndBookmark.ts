import { Recipe } from './recipe.types';
import { useBookmark } from './useBookmark';
import { useLike } from './useLike';

export function useLikeAndBookmark(recipeId: string | undefined, recipe: Recipe) {
    const { toggleLike } = useLike(recipeId, recipe);
    const { toggleBookmark } = useBookmark(recipeId, recipe);

    return {
        toggleLike,
        toggleBookmark,
    };
}
