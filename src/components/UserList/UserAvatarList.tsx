import { Button, Grid, GridItem } from '@chakra-ui/react';

import { BloggerShortInfo } from '~/query/blogs/blogs.type';
import { masProfiles } from '~/store/blog/blog.constants';

import UserProfile from '../UserProfile';

type Props = {
    mas?: BloggerShortInfo[];
};

export function UserAvatarList({ mas = masProfiles }: Props) {
    const handleToggle = () => {};
    console.log(mas);

    return (
        <>
            <Grid templateColumns='repeat(3, 1fr)' gap={3}>
                {mas.map((el) => (
                    <GridItem
                        key={`UserList_${el._id}`}
                        px={6}
                        py={4}
                        layerStyle='card'
                        w='full'
                        minW={0}
                    >
                        <UserProfile profile={el} isTruncated />
                    </GridItem>
                ))}
            </Grid>
            {handleToggle && (
                <Button
                    onClick={handleToggle}
                    mt={3}
                    mx='auto'
                    display='block'
                    size='sm'
                    variant='plain'
                >
                    Показать больше
                </Button>
            )}
        </>
    );
}
