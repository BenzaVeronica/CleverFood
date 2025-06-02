import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { isServerError } from '~/query/errors/error.utils';
import { useBookmarkRecipeByMutation } from '~/query/recipe/recipe.api';
import { CustomErrorResponse } from '~/query/types';
import { addError } from '~/widgets/error/error-slice';

import { useAppDispatch } from '../hooks';

export function useBookmark(recipeId: string | undefined) {
    const dispatch = useAppDispatch();
    const [bookmarkRecipeBy] = useBookmarkRecipeByMutation();

    const toggleBookmark = async () => {
        if (!recipeId) return;
        try {
            await bookmarkRecipeBy(recipeId).unwrap();
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (isServerError(err.status)) {
                dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
            }
        }
    };

    return { toggleBookmark };
}
