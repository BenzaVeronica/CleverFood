import { GridProps } from '@chakra-ui/react';
import { useMemo } from 'react';

import useCurrentCategories, {
    getAllSubCategoryIdsByCategoryIds,
} from '~/query/category/category.utils';
import { useGetRecipesQuery } from '~/query/recipe/recipe.api';
import { RECEPIES_PARAMS } from '~/query/recipe/recipe.constants';
import { ResponseParams } from '~/query/types';
import { selectCategories } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe/recipe-filter-selector';

import CardListPaginated from './CardListPaginated';

type Props = {
    dataTestId?: string;
} & GridProps;

function CardListWithFilter({ dataTestId, ...gridProps }: Props) {
    const { currentCategory, allSubCategories } = useCurrentCategories();
    const filters = useAppSelector(selectRecipeFilter);
    const categories = useAppSelector(selectCategories);

    const filterParams = useMemo<ResponseParams>(() => {
        if (!filters.isFilter) return RECEPIES_PARAMS;

        const params = RECEPIES_PARAMS;

        if (filters.allergens.length > 0) {
            params.allergens = filters.allergens.join(',');
        }
        if (filters.searchQuery) {
            params.searchString = filters.searchQuery.toLowerCase();
        }
        if (filters.meatTypes.length > 0) {
            params.meat = filters.meatTypes.map((l) => l.toLowerCase()).join(',');
        }
        if (filters.sideDishes.length > 0) {
            params.garnish = filters.sideDishes.map((l) => l.toLowerCase()).join(',');
        }
        if (currentCategory) {
            params.subcategoriesIds = allSubCategories.map((cat) => cat._id).join(',');
        } else if (filters.categories.length > 0) {
            params.subcategoriesIds = getAllSubCategoryIdsByCategoryIds(
                categories,
                filters.categories,
            ).join(',');
            // params.subcategoriesIds = filters.categories.map(el=> get(el, categories));
            // params.subcategoriesIds = filters.subCategories.join(',');
        }

        return params;
        // return {
        //     ...RECEPIES_PARAMS,
        //     allergens: filters.allergens.join(','),
        //     searchString: filters.searchQuery,
        //     meat: filters.meatTypes.join(','),
        //     garnish: filters.sideDishes.join(','),
        //     subcategoriesIds: currentCategory
        //         ? allSubCategories.join(',')
        //         : filters.subCategories.join(','),
        // };
    }, [filters, currentCategory, allSubCategories]);

    return (
        <CardListPaginated
            queryHook={useGetRecipesQuery}
            queryParams={filterParams}
            {...gridProps}
            dataTestId={dataTestId}
            // shouldReset={filters.isFilter}
        />
    );
}

export default CardListWithFilter;
