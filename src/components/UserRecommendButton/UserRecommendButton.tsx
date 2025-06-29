import { Button, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import OkIcon from '~/assets/ok-filled.svg?react';
import { useAuth } from '~/store/auth/useAuth';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { useRecommend } from '~/store/recipe-filter/useRecommend';
import { useToastNotifications } from '~/utils/useToastNotifications';

type Props = {
    recipe: Recipe;
    masRecommendedByUserId: string[] | undefined;
    onLoadingChange?: (loading: boolean) => void;
};

export function UserRecommendButton({
    masRecommendedByUserId = [],
    onLoadingChange,
    recipe,
}: Props) {
    const { user } = useAuth();

    const isRecommended = user ? masRecommendedByUserId.includes(user?.userId) : false;

    const { recipeId } = useParams();
    const { toggleRecommend } = useRecommend();

    const [isActiveState, setIsActiveState] = useState(isRecommended);

    const { handleServerError } = useToastNotifications();
    const handleActiveAction = async () => {
        if (!recipeId) return;
        try {
            onLoadingChange?.(true);
            await toggleRecommend(recipeId, recipe);
            setIsActiveState(!isActiveState);
        } catch (error) {
            handleServerError(error);
        } finally {
            onLoadingChange?.(false);
        }
    };
    const buttonData = isActiveState
        ? {
              text: 'Вы порекомендовали',
              icon: 'invert(0)',
              variant: 'btnOutlineBlack',
          }
        : {
              text: 'Рекомендовать рецепт',
              icon: 'invert(1)',
              variant: 'btnMain',
          };

    return (
        <Button
            variant={buttonData.variant}
            size='md'
            leftIcon={<Icon as={OkIcon} filter={buttonData.icon} />}
            onClick={handleActiveAction}
        >
            {buttonData.text}
        </Button>
    );
}
