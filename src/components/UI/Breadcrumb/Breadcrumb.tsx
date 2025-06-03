import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import useCurrentCategories from '~/query/category/category.utils';
import { PageRoutes } from '~/routes/PageRoutes.constants';

type Props = {
    closeMenu?: () => void;
    breadcrumbProps?: Partial<BreadcrumbProps>;
};

function CustomBreadcrumb({ closeMenu = () => {}, breadcrumbProps }: Props) {
    const location = useLocation();
    const { recipeId } = useParams();
    const { currentCategory, currentSubcategory, currentRecipe } = useCurrentCategories();
    const hasNewRecipePath = location.pathname.includes('/new-recipe');

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

export default CustomBreadcrumb;
