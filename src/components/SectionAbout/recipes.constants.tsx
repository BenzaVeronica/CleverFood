// import { masDishCategories } from '~/store/category/category.constants';
// import { dishCategory } from '~/store/category/category.types';
import { MAS_RECIPES } from '~/store/recipe/recipe.constants';
import { recipe } from '~/store/recipe/recipe.types';

export type recipes = {
    id: number;
    title: string;
    text: string;
    cards: recipe[];
    recipts: recipe[];
    // recipts: {
    //     id: number;
    //     category: dishCategory;
    //     title: string;
    // }[];
};
export const vegan = {
    cards: MAS_RECIPES.slice(2, 5),
    id: 30,
    title: 'Веганская кухня',
    text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
    recipts: MAS_RECIPES.slice(0, 3),
    // recipts: [
    //     {
    //         id: 31,
    //         category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
    //         title: 'Стейк для вегетарианцев',
    //     },
    //     {
    //         id: 32,
    //         category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
    //         title: 'Котлеты из гречки и фасоли',
    //     },
    //     {
    //         id: 33,
    //         category: masDishCategories.find((el) => el.title === 'Первые блюда') as dishCategory,
    //         title: 'Сырный суп с лапшой и брокколи',
    //     },
    // ],
};
export const desert = {
    cards: MAS_RECIPES.slice(4, 7),
    id: 40,
    title: 'Десерты, выпечка',
    text: 'Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.',
    recipts: MAS_RECIPES.slice(0, 3),
    // recipts: [
    //     {
    //         id: 41,
    //         category: masDishCategories.find((el) => el.title === 'Детские блюда') as dishCategory,
    //         title: 'Домашние сырные палочки',
    //     },
    //     {
    //         id: 42,
    //         category: masDishCategories.find(
    //             (el) => el.title === 'Национальные блюда',
    //         ) as dishCategory,
    //         title: 'Панкейки',
    //     },
    //     {
    //         id: 43,
    //         category: masDishCategories.find(
    //             (el) => el.title === 'Веганская кухня',
    //         ) as dishCategory,
    //         title: 'Воздушное банановое печенье на сковороде',
    //     },
    // ],
};
