import { useBookmark } from './useBookmark';
import { useLike } from './useLike';

export function useLikeAndBookmark(recipeId: string | undefined) {
    const { toggleLike } = useLike(recipeId);
    const { toggleBookmark } = useBookmark(recipeId);

    return {
        toggleLike,
        toggleBookmark,
    };
}
