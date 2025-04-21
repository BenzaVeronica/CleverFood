import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import useCurrentCategories from '~/store/category/utils';

type Props = {
    // currentRecipe: recipe | null;
};

function CustomBreadcrumb(_props: Props) {
    const location = useLocation();
    const { currentCategory, currentSubcategory, currentRecipe } = useCurrentCategories();
    // console.log(props.currentRecipe);

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            // flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            display={{ base: 'inline', lg: 'block' }}
            separator={<ChevronRightIcon color='gray.500' />}
            flex={{ base: 'none', lg: '1' }}
            ml={{ base: 0, lg: 28 }}
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

            {location.pathname === '/the-most' && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as='span'>Самое сочное</BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {currentCategory && (
                <BreadcrumbItem isCurrentPage={!currentSubcategory} color='blackAlpha.700'>
                    <BreadcrumbLink
                        as={Link}
                        to={`/${currentCategory.url}/${currentCategory.subcategories[0].url}`}
                    >
                        {currentCategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {currentSubcategory && currentCategory && (
                <BreadcrumbItem isCurrentPage={!currentRecipe}>
                    <BreadcrumbLink
                        as={Link}
                        to={`/${currentCategory.url}/${currentSubcategory.url}`}
                    >
                        {currentSubcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {currentRecipe && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as='span'>{currentRecipe.title}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
}

export default CustomBreadcrumb;
