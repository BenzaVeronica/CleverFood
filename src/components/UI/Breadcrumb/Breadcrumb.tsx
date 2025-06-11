import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { useGetBloggerByIdQuery } from '~/query/blogs/blogs.api';
import useCurrentCategories from '~/query/category/category.utils';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';

type Props = {
    closeMenu?: () => void;
    breadcrumbProps?: Partial<BreadcrumbProps>;
};

export function CustomBreadcrumb({ closeMenu = () => {}, breadcrumbProps }: Props) {
    const location = useLocation();
    const { recipeId, bloggerId } = useParams();
    const { currentCategory, currentSubcategory, currentRecipe } = useCurrentCategories();
    const hasNewRecipePath = location.pathname.includes('/new-recipe');

    const { user } = useAuth();
    const { data } = useGetBloggerByIdQuery(
        {
            bloggerId: bloggerId ?? '',
            currentUserId: user?.userId ?? '',
        },
        {
            skip: !user?.userId || !bloggerId,
        },
    );

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            display={{ base: 'inline', lg: 'block' }}
            separator={<ChevronRightIcon color='gray.500' />}
            flex={{ base: 'none', lg: '1' }}
            ml={{ base: 0, lg: 28 }}
            {...breadcrumbProps}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to='/'
                    color={location.pathname !== '/' ? 'blackAlpha.700' : undefined}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {location.pathname === `/${PageRoutes.MOST}` && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as='span'>Самое сочное</BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {location.pathname.startsWith(PageRoutes.BLOGS) && (
                <BreadcrumbItem
                    as={Link}
                    to={PageRoutes.BLOGS}
                    isCurrentPage={!bloggerId}
                    data-test-id={TEST_ID.Bloggers.BloggerUserBreadcrumbName}
                >
                    <BreadcrumbLink as='span'>Блоги</BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {/* {user?.userId && (
                <BreadcrumbItem isCurrentPage={bloggerId === user?.userId}>
                    <BreadcrumbLink as='span'>Мой профиль</BreadcrumbLink>
                </BreadcrumbItem>
            )} */}
            {/* { && (
                <BreadcrumbItem>
                    <BreadcrumbLink as='span'>Настройки</BreadcrumbLink>
                </BreadcrumbItem>
            )} */}
            {bloggerId && data && (
                <BreadcrumbItem
                    isCurrentPage
                    data-test-id={TEST_ID.Bloggers.BloggerUserBreadcrumbSection}
                >
                    <BreadcrumbLink as='span'>
                        {`${data?.bloggerInfo.firstName} ${data?.bloggerInfo.lastName} (@${data?.bloggerInfo.login})`}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {currentCategory && (
                <BreadcrumbItem isCurrentPage={!currentSubcategory} color='blackAlpha.700'>
                    <BreadcrumbLink
                        as={Link}
                        to={`/${currentCategory.category}/${currentCategory.subCategories[0].category}`}
                        onClick={closeMenu}
                    >
                        {currentCategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {currentSubcategory && currentCategory && (
                <BreadcrumbItem isCurrentPage={!currentRecipe}>
                    <BreadcrumbLink
                        as={Link}
                        to={`/${currentCategory.category}/${currentSubcategory.category}`}
                        onClick={closeMenu}
                    >
                        {currentSubcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {recipeId && currentRecipe && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as='span'>{currentRecipe.title}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {hasNewRecipePath && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as='span'>Новый рецепт</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
}
