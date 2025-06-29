import { GridItem } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import { CardListPaginated } from '~/components/CardList/CardListPaginated';
import SectionBlog from '~/components/SectionBlog';
import SectionNotes from '~/components/SectionNotes';
import { UserCardMain } from '~/components/UserCard/UserCardMain';
import { useGetBloggerByIdQuery } from '~/query/blogs/blogs.api';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { useGetRecipesByUserIdQuery } from '~/query/recipe/recipe.api';
import { PageRoutes, PageRoutesHash } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';
import { scrollToHash, useHash } from '~/utils/useHash';
import { useToastNotifications } from '~/utils/useToastNotifications';
const TEST_ID_MAIN_BLOGGER = {
    box: TEST_ID.Bloggers.BloggerUserInfoBox,
    name: TEST_ID.Bloggers.BloggerUserInfoName,
    login: TEST_ID.Bloggers.BloggerUserInfoLogin,
};
export default function BloggerPage() {
    const { user } = useAuth();
    const { bloggerId } = useParams();
    const { data, error: errorBlogger } = useGetBloggerByIdQuery(
        {
            bloggerId: bloggerId ?? '',
            currentUserId: user?.userId ?? '',
        },
        {
            skip: !user?.userId || !bloggerId,
        },
    );
    const { data: recipesRes, error: errorRecipesByUser } = useGetRecipesByUserIdQuery(
        bloggerId ? { userId: bloggerId } : skipToken,
    );

    const navigate = useNavigate();

    const { showErrorReduxMessage } = useToastNotifications();
    useEffect(() => {
        if (!errorBlogger && !errorRecipesByUser) return;
        const errors = [errorBlogger, errorRecipesByUser]
            .map((item) => item as CustomErrorResponse)
            .filter((el) => el);
        if (errors.length > 0) {
            errors.forEach((err) => {
                if (isServerError(err.status)) {
                    showErrorReduxMessage(TOAST_MESSAGE.ServerErrorToast);
                    navigate('/');
                } else if (err.status === 404) {
                    navigate(PageRoutes.NOT_FOUND);
                } else {
                    showErrorReduxMessage({ title: err.title, description: '' });
                }
            });
        }
    }, [errorBlogger, errorRecipesByUser]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bloggerId]);

    const hash = useHash();
    useEffect(() => {
        if (data && recipesRes) {
            scrollToHash(hash, 240);
        }
    }, [data, recipesRes, hash]);

    if (!data) return;
    return (
        <ContainerGridLayout>
            <GridItem colSpan={{ base: 4, md: 12 }} pt={40}>
                <UserCardMain profile={data} dataTestId={TEST_ID_MAIN_BLOGGER} />
                {recipesRes?.recipes && (
                    <CardListPaginated
                        mt={6}
                        allRecipes={recipesRes?.recipes}
                        dataTestId={TEST_ID.Button.LoadMore}
                        dataTestIdGrid={TEST_ID.Bloggers.RecipeCardList}
                    />
                )}
                {data?.bloggerInfo.notes && (
                    <SectionNotes id={PageRoutesHash.NOTES} notes={data?.bloggerInfo.notes ?? []} />
                )}
                <SectionBlog title='Другие блоги' isVisibleSubscribeBtn isVisibleStatBox />
            </GridItem>
        </ContainerGridLayout>
    );
}
