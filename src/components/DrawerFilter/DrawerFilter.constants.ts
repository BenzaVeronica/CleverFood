import { masDishCategories } from '~/store/category/category.constants';
import { addIdToArray } from '~/store/utils';
export type FilterOptionType = {
    id: string;
    label: string;
};
export const filterMeatTypes: FilterOptionType[] = [
    {
        id: 'Chicken',
        label: 'Курица',
    },
    {
        id: 'Pork',
        label: 'Свинина',
    },
    {
        id: 'Beef',
        label: 'Говядина',
    },
    {
        id: 'Turkey',
        label: 'Индейка',
    },
    {
        id: 'Duck',
        label: 'Утка',
    },
];
export const filterSideDish: FilterOptionType[] = [
    {
        id: 'Potatoes',
        label: 'Картошка',
    },
    {
        id: 'Buckwheat',
        label: 'Гречка',
    },
    {
        id: 'Pasta',
        label: 'Паста',
    },
    {
        id: 'Spaghetti',
        label: 'Спагетти',
    },
    {
        id: 'Rice',
        label: 'Рис',
    },
    {
        id: 'Cabbage',
        label: 'Капуста',
    },
    {
        id: 'Beans',
        label: 'Фасоль',
    },
    {
        id: 'Others',
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
const filterAlergensWithoutId: string[] = [
    'Молочные продукты',
    // 'Молоко',
    'Яйцо',
    // 'болгарский перец',
    // 'Рыба',
    'Моллюски',
    'Орехи',
    'Цитрусовые',
    'Томат (помидор)',
    'Клубника (ягоды)',
    'Шоколад',
];
// export const filterCategory: FilterOptionType[] = addIdToArray(filterMeatWithoutId);
export const filterCategory: FilterOptionType[] = masDishCategories.map((category) => ({
    id: category.url,
    label: category.title,
}));
export const filterAuthor: FilterOptionType[] = addIdToArray(filterAuthorWithoutId);
export const filterAlergens: FilterOptionType[] = filterAlergensWithoutId.map((item) => ({
    id: item,
    label: item,
}));
// export const filterAlergens: FilterOptionType[] = Array.from(
//     new Set(
//         MAS_RECIPES.flatMap((category) =>
//             category.ingredients.map((ingr) => (ingr.title !== 'специи' ? ingr.title : 'Лук')),
//         ),
//     ),
// ).map((label) => ({ id: label, label }));
