import { StackProps, VStack } from '@chakra-ui/react';

import Users from '~/assets/users-filled.svg?react';
import { useGetUserMeQuery } from '~/query/user/user.api';
import { pluralizeSubscribes } from '~/utils/pluralizeRecipes';

import StatTitle from '../UI/StatTitle';
import { UserAvatarList } from '../UserList/UserAvatarList';

export function StatisticsSubscribers({ ...rest }: StackProps) {
    const { data: me } = useGetUserMeQuery();
    return (
        <VStack {...rest} alignItems='start' w='100%'>
            <StatTitle icon={Users}>{pluralizeSubscribes(me?.subscribers.length)}</StatTitle>
            <UserAvatarList mas={me?.subscribers} />
        </VStack>
    );
}
