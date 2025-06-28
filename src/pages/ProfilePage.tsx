import { GridItem } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import { CardListPaginated } from '~/components/CardList/CardListPaginated';
import { SectionNotesWithAddRemove } from '~/components/SectionNotes/SectionNotesWithAddRemove';
import CustomTitleWithCount from '~/components/UI/CustomTitleWithCount';
import { UserCardMain } from '~/components/UserCard/UserCardMain';
import UserProfileTabs from '~/components/UserProfileTabs';
import { localStorageData } from '~/localStorage/constants';
import { setDataToLocalStorage } from '~/localStorage/localStorage';
import { useGetRecipesByUserIdQuery } from '~/query/recipe/recipe.api';
import { useGetStatFromBloggerByIdAndStat } from '~/query/user/user.utils';
import { TEST_ID } from '~/test/test.constant';
import ErrorNotification from '~/widgets/error/ErrorNotification';

export default function ProfilePage() {
    const blogger = useGetStatFromBloggerByIdAndStat();

    const { data: recipesRes } = useGetRecipesByUserIdQuery(
        blogger.bloggerInfo?._id ? { userId: blogger.bloggerInfo?._id } : skipToken,
    );

    const countBookmarks = recipesRes?.myBookmarks?.length ?? 0;

    useEffect(() => {
        if (recipesRes) {
            setDataToLocalStorage(localStorageData.userIdForBookmarkTest, recipesRes?.userId);
        }
    }, [recipesRes]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [blogger]);

    if (!blogger) return;
    return (
        <ContainerGridLayout>
            <ErrorNotification />
            <GridItem colSpan={{ base: 4, md: 12 }} pt={40}>
                <UserCardMain profile={blogger} isMyPage dataTestId={TEST_ID.sprint7.userprofile} />

                <UserProfileTabs
                    drafts={blogger.bloggerInfo?.drafts}
                    recipes={recipesRes?.recipes}
                />

                <SectionNotesWithAddRemove data={recipesRes?.notes ?? []} my={10} />
                <div data-test-id={TEST_ID.sprint7.userprofilebookmarks}>
                    <CustomTitleWithCount title='Мои закладки' count={countBookmarks} />
                    <CardListPaginated
                        my={6}
                        allRecipes={recipesRes?.myBookmarks ?? []}
                        config={{ bookmark: true }}
                    />
                </div>
            </GridItem>
        </ContainerGridLayout>
    );
}
