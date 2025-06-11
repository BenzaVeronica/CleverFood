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
import { useAppDispatch } from '~/store/hooks';
import { TEST_ID } from '~/test/test.constant';
import { useHash, useScrollToHash } from '~/utils/useHash';
import { addError } from '~/widgets/error/error-slice';

export function BloggerPage() {
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
    // console.log(recipesRes);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(errorBlogger);
        console.log(errorRecipesByUser);

        if (!errorBlogger && !errorRecipesByUser) return;
        const errors = [errorBlogger, errorRecipesByUser]
            .map((item) => item as CustomErrorResponse)
            .filter((el) => el);
        if (errors.length > 0) {
            console.log(errors);

            errors.forEach((err) => {
                if (isServerError(err.status)) {
                    dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
                    navigate('/');
                } else if (err.status === 404) {
                    navigate(PageRoutes.NOT_FOUND);
                } else {
                    dispatch(addError(err));
                }
            });
        }
    }, [errorBlogger, errorRecipesByUser]);

    const hash = useHash();
    useScrollToHash(hash);
    if (!data) return;
    return (
        <ContainerGridLayout>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <UserCardMain profile={data} dataTestId={TEST_ID.Bloggers.BloggerUserInfoBox} />
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
