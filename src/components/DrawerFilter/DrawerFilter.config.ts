import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';

import { FilterOptionType } from './DrawerFilter.constants';
import {
    filterAlergens,
    filterAuthor,
    filterMeatTypes,
    filterSideDish,
} from './DrawerFilter.constants';

export type FilterConfigType = {
    categories: FilterOptionType[];
    author: FilterOptionType[];
    meatTypes: FilterOptionType[];
    sideDishes: FilterOptionType[];
    allergens: FilterOptionType[];
};

export function useFilterConfig(): FilterConfigType {
    const { categories } = useAppSelector(selectCategoriesWithSubs);

    const filterCategory: FilterOptionType[] = categories.map((cat) => ({
        id: cat.category,
        label: cat.title,
    }));

    return {
        categories: filterCategory,
        author: filterAuthor,
        meatTypes: filterMeatTypes,
        sideDishes: filterSideDish,
        allergens: filterAlergens,
    };
}
