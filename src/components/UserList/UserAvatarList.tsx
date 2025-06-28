import { Grid, GridItem } from '@chakra-ui/react';

import { useUsersByListId } from '~/query/user/user.utils';

import UserProfile from '../UserProfile';

type Props = {
    mas?: string[];
};

export function UserAvatarList({ mas = [] }: Props) {
    const subscribers = useUsersByListId(mas);
    return (
        <>
            <Grid templateColumns='repeat(3, 1fr)' gap={3} w='100%'>
                {subscribers?.map((el) => {
                    if (!el) return;
                    return (
                        <GridItem
                            key={`UserList_${el.login}`}
                            px={6}
                            py={4}
                            layerStyle='card'
                            w='full'
                            minW={0}
                        >
                            <UserProfile profile={el} isTruncated />
                        </GridItem>
                    );
                })}
            </Grid>
        </>
    );
}
