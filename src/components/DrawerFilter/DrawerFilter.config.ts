import { FilterOptionType } from './DrawerFilter.constants';
import {
    filterAlergens,
    filterAuthor,
    filterCategory,
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

export const filterConfig: FilterConfigType = {
    categories: filterCategory,
    author: filterAuthor,
    meatTypes: filterMeatTypes,
    sideDishes: filterSideDish,
    allergens: filterAlergens,
};
