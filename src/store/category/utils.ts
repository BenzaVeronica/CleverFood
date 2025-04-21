import { useParams } from 'react-router';

import childrenDishes from '../../assets/icons/childrenDishes.svg';
import desserts from '../../assets/icons/desserts.svg';
import drinks from '../../assets/icons/drinks.svg';
import firstCourses from '../../assets/icons/firstCourses.svg';
import grilledDishes from '../../assets/icons/grilledDishes.svg';
import healthNutrition from '../../assets/icons/healthNutrition.svg';
import mainCourses from '../../assets/icons/mainCourses.svg';
import national from '../../assets/icons/national.svg';
import preparations from '../../assets/icons/preparations.svg';
import salads from '../../assets/icons/salads.svg';
import sauces from '../../assets/icons/sauces.svg';
import snacks from '../../assets/icons/snacks.svg';
import veganCuisine from '../../assets/icons/veganCuisine.svg';
import { MAS_RECIPES } from '../recipe/recipe.constants';
import { masDishCategories } from './category.constants';
import { dishCategory, dishSubcategory } from './category.types';

function useCurrentCategories() {
    const { categoryId, subcategoryId, recipeId } = useParams();

    const currentCategory = masDishCategories.find((cat: dishCategory) => cat.url === categoryId);
    const currentSubcategory = currentCategory?.subcategories?.find(
        (sub: dishSubcategory) => sub.url === subcategoryId,
    );
    const currentRecipe = MAS_RECIPES.find((el) => el.id == recipeId) || null;

    return {
        currentCategory,
        currentSubcategory,
        currentRecipe,
    };
}

export default useCurrentCategories;

type CategoryMap = {
    // [key: string]: string ;
    [key: string]: {
        icon: string;
        text: string;
    };
};
const CATEGORIES: CategoryMap = {
    unknown: {
        icon: drinks,
        text: 'Неопределено',
    },
    salads: {
        icon: salads,
        text: 'Салаты',
    },
    snacks: {
        icon: snacks,
        text: 'Закуски',
    },
    'first-courses': {
        icon: firstCourses,
        text: 'Первые блюда',
    },
    'second-dish': {
        icon: mainCourses,
        text: 'Вторые блюда',
    },
    desserts: {
        icon: desserts,
        text: 'Десерты, выпечка',
    },
    'grilled-dishes': {
        icon: grilledDishes,
        text: 'Блюда на гриле',
    },
    vegan: {
        icon: veganCuisine,
        text: 'Веганская кухня',
    },
    'children-dishes': {
        icon: childrenDishes,
        text: 'Детские блюда',
    },
    'health-nutrition': {
        icon: healthNutrition,
        text: 'Лечебное питание',
    },
    national: {
        icon: national,
        text: 'Национальные блюда',
    },
    sauces: {
        icon: sauces,
        text: 'Соусы',
    },
    'home-preparations': {
        icon: preparations,
        text: 'Домашние заготовки',
    },
    drinks: {
        icon: drinks,
        text: 'Напитки',
    },
};
export const chooseIconCategory = (title: string) =>
    CATEGORIES[title].icon || CATEGORIES['unknown'].icon;
export const chooseTextCategory = (title: string) =>
    CATEGORIES[title].text || CATEGORIES['unknown'].text;
// type CategoryMap = {
//     [key: string]: string ;
//   }
// export const chooseIconCategory = (title: string) => {
//     const categoryMap:CategoryMap = {
//         'salads': salads,
//         'snacks': snacks,
//         'first-courses': firstCourses,
//         'main-courses': mainCourses,
//         'desserts': desserts,
//         'grilled-dishes': grilledDishes,
//         'vegan-cuisine': veganCuisine,
//         'children-dishes': childrenDishes,
//         'health-nutrition': healthNutrition,
//         'national-cuisine': national,
//         'sauces': sauces,
//         'home-preparations': preparations,
//         'drinks': drinks,
//     };
//     return categoryMap[title] || categoryMap['salads'];
// };
// export const chooseTextCategory = (title: string) => {
//     const categoryMap:CategoryMap = {
//         'salads': 'Салаты',
//         'snacks': 'Закуски',
//         'first-courses': 'Первые блюда',
//         'main-courses': 'Вторые блюда',
//         'desserts': 'Десерты, выпечка',
//         'grilled-dishes': 'Блюда на гриле',
//         'vegan-cuisine': 'Веганская кухня',
//         'children-dishes': 'Детские блюда',
//         'health-nutrition': 'Лечебное питание',
//         'national-cuisine': 'Национальные блюда',
//         'sauces': 'Соусы',
//         'home-preparations': 'Домашние заготовки',
//         'drinks': 'Напитки',
//     };
//     return categoryMap[title] || categoryMap['salads'];
// };
