import { masDishCategories } from '~/store/category/category.constants';
import { MAS_RECIPES } from '~/store/recipe/recipe.constants';
import { addIdToArray } from '~/store/utils';
export type FilterOptionType = {
    id: string;
    label: string;
};
const filterMeatWithoutId: { label: string }[] = [
    {
        label: 'Курица',
    },
    {
        label: 'Свинина',
    },
    {
        label: 'Говядина',
    },
    {
        label: 'Индейка',
    },
    {
        label: 'Утка',
    },
];
const filterSideDishWithoutId: { label: string }[] = [
    {
        label: 'Картошка',
    },
    {
        label: 'Гречка',
    },
    {
        label: 'Паста',
    },
    {
        label: 'Спагетти',
    },
    {
        label: 'Рис',
    },
    {
        label: 'Капуста',
    },
    {
        label: 'Фасоль',
    },
    {
        label: 'Другие овощи',
    },
];
const filterAuthorWithoutId: { label: string }[] = [
    {
        label: 'Иванов Иван',
    },
    {
        label: 'Екатерина Константинопольская',
    },
    {
        label: 'Иванова Екатерина',
    },
];
export const filterMeatTypes: FilterOptionType[] = addIdToArray(filterMeatWithoutId);
export const filterSideDish: FilterOptionType[] = addIdToArray(filterSideDishWithoutId);
// export const filterCategory: FilterOptionType[] = addIdToArray(filterMeatWithoutId);
export const filterCategory: FilterOptionType[] = masDishCategories.map((category) => ({
    id: category.id,
    label: category.title,
}));
export const filterAuthor: FilterOptionType[] = addIdToArray(filterAuthorWithoutId);
export const filterAlergens: FilterOptionType[] = addIdToArray(
    Array.from(
        new Set(MAS_RECIPES.flatMap((category) => category.ingredients.map((ingr) => ingr.title))),
    ).map((label) => ({ label })),
);
