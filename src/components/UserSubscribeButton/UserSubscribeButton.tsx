import { Button, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import userDone from '~/assets/user-done.svg?react';
import Subscribe from '~/assets/user-plus.svg?react';
import { useToggleSubscriptionMutation } from '~/query/user/user.api';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';
import { useToastNotifications } from '~/utils/useToastNotifications';

type Props = {
    isSubscribe: boolean;
    userId?: string;
    onLoadingChange?: (loading: boolean) => void;
    withTooltip?: boolean;
};

export function UserSubscribeButton({ isSubscribe, userId, onLoadingChange, withTooltip }: Props) {
    const [isSubscribeState, setIsSubscribeState] = useState(isSubscribe);

    const [toggleSubscription] = useToggleSubscriptionMutation();
    const { user } = useAuth();
    const { handleServerError } = useToastNotifications();
    const handleSubscribe = async () => {
        if (!userId) return;
        try {
            onLoadingChange?.(true);
            await toggleSubscription({
                fromUserId: user?.userId ?? '',
                toUserId: userId,
            }).unwrap();
            setIsSubscribeState(!isSubscribeState);
        } catch (error) {
            handleServerError(error);
        } finally {
            onLoadingChange?.(false);
        }
    };
    const subscribeData = isSubscribeState
        ? {
              text: 'Вы подписаны',
              icon: userDone,
              variant: 'btnOutlineBlack',
              dataTestId: TEST_ID.Bloggers.BlogToggleUnsubscribe,
          }
        : {
              text: 'Подписаться',
              icon: Subscribe,
              variant: 'btnMain',
              dataTestId: TEST_ID.Bloggers.BlogToggleSubscribe,
          };

    return (
        <Tooltip
            data-test-id={TEST_ID.Bloggers.BlogTooltip}
            label='Нажмите, если хотите отписаться'
            hasArrow
            arrowSize={15}
            bg='black'
            color='white'
            maxW='150px'
            isDisabled={!withTooltip}
        >
            <Button
                data-test-id={subscribeData.dataTestId}
                h={6}
                size={{ base: 'xs', lg: 'sm' }}
                onClick={handleSubscribe}
                variant={subscribeData.variant}
                colorScheme='black'
                leftIcon={<Icon as={subscribeData.icon} />}
            >
                {subscribeData.text}
            </Button>
        </Tooltip>
    );
}
