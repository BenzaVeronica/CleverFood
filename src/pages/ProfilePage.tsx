import { GridItem } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import DrawerNewNotes from '~/components/DrawerNewNotes';
import SectionNotes from '~/components/SectionNotes';
import CustomTitleWithCount from '~/components/UI/CustomTitleWithCount';
import { UserCardMain } from '~/components/UserCard/UserCardMain';
import UserProfileTabs from '~/components/UserProfileTabs';
import { useDrawers } from '~/context/DrawerContext';
import { useGetBloggerByIdQuery } from '~/query/blogs/blogs.api';
import { useGetRecipesByUserIdQuery } from '~/query/recipe/recipe.api';
import { PageRoutesHash } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';

export function ProfilePage() {
    const { user } = useAuth();
    const { data } = useGetBloggerByIdQuery(
        {
            bloggerId: user?.userId ?? '',
            currentUserId: user?.userId ?? '',
        },
        {
            skip: !user?.userId,
        },
    );
    const { data: recipesRes } = useGetRecipesByUserIdQuery(
        user?.userId ? { userId: user?.userId } : skipToken,
    );
    console.log(recipesRes);
    const { newRecipeDrawer } = useDrawers();
    if (!data) return;
    return (
        <ContainerGridLayout>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <UserCardMain profile={data} isFull isMyPage />

                <UserProfileTabs />

                {data?.bloggerInfo.notes && (
                    <SectionNotes
                        id={PageRoutesHash.NOTES}
                        notes={data?.bloggerInfo.notes ?? []}
                        handleAddNote={newRecipeDrawer.onOpen}
                    />
                )}
                <CustomTitleWithCount title='Мои закладки' count={0} />
                {newRecipeDrawer.isOpen && (
                    <DrawerNewNotes
                        isOpen={newRecipeDrawer.isOpen}
                        onClose={newRecipeDrawer.onClose}
                    />
                )}
            </GridItem>
        </ContainerGridLayout>
    );
}
