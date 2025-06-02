import { useMemo } from 'react';

import useCurrentCategories, {
    getAllSubCategoryIdsByCategoryIds,
} from '~/query/category/category.utils';
import { RECEPIES_PARAMS } from '~/query/recipe/recipe.constants';
import { ResponseParams } from '~/query/types';
import { selectCategories } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';

export const useFilterParams = () => {
    const { currentCategory, allSubCategories } = useCurrentCategories();
    const filters = useAppSelector(selectRecipeFilter);
    const categories = useAppSelector(selectCategories);

    return useMemo<ResponseParams>(() => {
        if (!filters.isFilter) return RECEPIES_PARAMS;

        const params = { ...RECEPIES_PARAMS };

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
        }

        return params;
    }, [filters, currentCategory, allSubCategories, categories]);
};
