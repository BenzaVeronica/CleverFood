import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { useLikeRecipeByMutation } from '~/query/recipe/recipe.api';
import { CustomErrorResponse } from '~/query/types';
import { addError } from '~/widgets/error/error-slice';

import { useAppDispatch } from '../hooks';

export function useLike(recipeId: string | undefined) {
    const dispatch = useAppDispatch();
    const [likeRecipeBy] = useLikeRecipeByMutation();

    const toggleLike = async () => {
        if (!recipeId) return;
        try {
            await likeRecipeBy(recipeId).unwrap();
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (err) {
                dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
            }
        }
    };

    return { toggleLike };
}
