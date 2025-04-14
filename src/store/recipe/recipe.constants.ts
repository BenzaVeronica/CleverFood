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
import img1 from '../../assets/imgRecipes/.image.jpg';
import img2 from '../../assets/imgRecipes/.image-1.jpg';
import img3 from '../../assets/imgRecipes/.image-2.jpg';
import img4 from '../../assets/imgRecipes/.image-3.jpg';
import img5 from '../../assets/imgRecipes/.image-4.jpg';
import img6 from '../../assets/imgRecipes/.image-5.jpg';
import img7 from '../../assets/imgRecipes/.image-6.jpg';
import img8 from '../../assets/imgRecipes/.image-7.jpg';
import img9 from '../../assets/imgRecipes/.image-8.jpg';
import img10 from '../../assets/imgRecipes/.image-9.jpg';
import img11 from '../../assets/imgRecipes/.image-10.jpg';
import img12 from '../../assets/imgRecipes/.image-11.jpg';
import img13 from '../../assets/imgRecipes/.image-12.jpg';
import img14 from '../../assets/imgRecipes/.image-13.jpg';
import img15 from '../../assets/imgRecipes/.image-14.jpg';
import { masProfiles } from '../blog/blog.constants';
import { addIdToArray } from '../utils';
import { dishCategory, recipe, recipeWithoutId } from './recipe.types';

export const masDishCategories: dishCategory[] = [
    {
        id: 1,
        title: 'Салаты',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'salads',
        icon: salads,
        subcategories: [
            { id: 101, title: 'Мясные салаты', url: 'meat-salads' },
            { id: 102, title: 'Рыбные салаты', url: 'fish-salads' },
            { id: 103, title: 'Овощные салаты', url: 'vegetable-salads' },
            { id: 104, title: 'Теплые салаты', url: 'warm-salads' },
        ],
    },
    {
        id: 2,
        title: 'Закуски',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'snacks',
        icon: snacks,
        subcategories: [
            { id: 201, title: 'Мясные закуски', url: 'meat-snacks' },
            { id: 202, title: 'Рыбные закуски', url: 'fish-snacks' },
            { id: 203, title: 'Овощные закуски', url: 'vegetable-snacks' },
            { id: 204, title: 'Теплые закуски', url: 'warm-snacks' },
            { id: 205, title: 'Бутерброды', url: 'sandwiches' },
            { id: 206, title: 'Фастфуд', url: 'fastfood' },
        ],
    },
    {
        id: 3,
        title: 'Первые блюда',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'first-courses',
        icon: firstCourses,
        subcategories: [
            { id: 301, title: 'Мясные супы', url: 'meat-soups' },
            { id: 302, title: 'Овощные супы', url: 'vegetable-soups' },
            { id: 303, title: 'Бульоны', url: 'broths' },
            { id: 304, title: 'Холодные супы', url: 'cold-soups' },
            { id: 305, title: 'Диетические супы', url: 'diet-soups' },
        ],
    },
    {
        id: 4,
        title: 'Вторые блюда',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'main-courses',
        icon: mainCourses,
        subcategories: [
            { id: 401, title: 'Мясные', url: 'meat-dishes' },
            { id: 402, title: 'Рыбные', url: 'fish-dishes' },
            { id: 403, title: 'Овощные', url: 'vegetable-dishes' },
            { id: 404, title: 'Из птицы', url: 'poultry-dishes' },
            { id: 405, title: 'Из грибов', url: 'mushroom-dishes' },
            { id: 406, title: 'Из субпродуктов', url: 'offal-dishes' },
            { id: 407, title: 'На пару', url: 'steamed-dishes' },
            { id: 408, title: 'Пельмени, вареники', url: 'dumplings' },
            { id: 409, title: 'Мучные гарниры', url: 'flour-side-dishes' },
            { id: 410, title: 'Овощные гарниры', url: 'vegetable-side-dishes' },
            { id: 411, title: 'Пицца', url: 'pizza' },
            { id: 412, title: 'Суши', url: 'sushi' },
        ],
    },
    {
        id: 5,
        title: 'Десерты, выпечка',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'desserts',
        icon: desserts,
        subcategories: [
            { id: 501, title: 'Блины и оладьи', url: 'pancakes' },
            { id: 502, title: 'Пироги и пончики', url: 'pies' },
            { id: 503, title: 'Торты', url: 'cakes' },
            { id: 504, title: 'Рулеты', url: 'rolls' },
            { id: 505, title: 'Кексы и маффины', url: 'cupcakes' },
            { id: 506, title: 'Сырники и ватрушки', url: 'cheesecakes' },
            { id: 507, title: 'Из слоеного теста', url: 'puff-pastry' },
            { id: 508, title: 'Из заварного теста', url: 'choux-pastry' },
            { id: 509, title: 'Из дрожжевого теста', url: 'yeast-dough' },
            { id: 510, title: 'Булочки и сдоба', url: 'buns' },
            { id: 511, title: 'Хлеб', url: 'bread' },
            { id: 512, title: 'Тесто на пиццу', url: 'pizza-dough' },
            { id: 513, title: 'Кремы', url: 'creams' },
        ],
    },
    {
        id: 6,
        title: 'Блюда на гриле',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'grilled-dishes',
        icon: grilledDishes,
        subcategories: [
            { id: 601, title: 'Говядина', url: 'grilled-beef' },
            { id: 602, title: 'Свинина', url: 'grilled-pork' },
            { id: 603, title: 'Птица', url: 'grilled-poultry' },
            { id: 604, title: 'Рыба', url: 'grilled-fish' },
            { id: 605, title: 'Грибы', url: 'grilled-mushrooms' },
            { id: 606, title: 'Овощи', url: 'grilled-vegetables' },
        ],
    },
    {
        id: 7,
        title: 'Веганская кухня',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'vegan-cuisine',
        icon: veganCuisine,
        subcategories: [
            { id: 701, title: 'Закуски', url: 'vegan-snacks' },
            { id: 702, title: 'Первые блюда', url: 'vegan-first-courses' },
            { id: 703, title: 'Вторые блюда', url: 'vegan-main-courses' },
            { id: 704, title: 'Гарниры', url: 'vegan-side-dishes' },
            { id: 705, title: 'Десерты', url: 'vegan-desserts' },
            { id: 706, title: 'Выпечка', url: 'vegan-bakery' },
            { id: 707, title: 'Сыроедческие блюда', url: 'raw-food' },
            { id: 708, title: 'Напитки', url: 'vegan-drinks' },
        ],
    },
    {
        id: 8,
        title: 'Детские блюда',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'children-dishes',
        icon: childrenDishes,
        subcategories: [
            { id: 801, title: 'Первые блюда', url: 'children-first-courses' },
            { id: 802, title: 'Вторые блюда', url: 'children-main-courses' },
            { id: 803, title: 'Гарниры', url: 'children-side-dishes' },
            { id: 804, title: 'Выпечка', url: 'children-bakery' },
            { id: 805, title: 'Без глютена', url: 'children-gluten-free' },
            { id: 806, title: 'Без сахара', url: 'children-sugar-free' },
            { id: 807, title: 'Без аллергенов', url: 'children-allergen-free' },
            { id: 808, title: 'Блюда для прикорма', url: 'baby-food' },
        ],
    },
    {
        id: 9,
        title: 'Лечебное питание',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'health-nutrition',
        icon: healthNutrition,
        subcategories: [
            { id: 901, title: 'Детская диета', url: 'children-diet' },
            { id: 902, title: 'Диета №1', url: 'diet-1' },
            { id: 903, title: 'Диета №2', url: 'diet-2' },
            { id: 904, title: 'Диета №3', url: 'diet-3' },
            { id: 905, title: 'Диета №5', url: 'diet-5' },
            { id: 906, title: 'Диета №6', url: 'diet-6' },
            { id: 907, title: 'Диета №7', url: 'diet-7' },
            { id: 908, title: 'Диета №8', url: 'diet-8' },
            { id: 909, title: 'Диета №9', url: 'diet-9' },
            { id: 910, title: 'Диета №10', url: 'diet-10' },
            { id: 911, title: 'Диета №11', url: 'diet-11' },
            { id: 912, title: 'Диета №12', url: 'diet-12' },
            { id: 913, title: 'Диета №13', url: 'diet-13' },
            { id: 914, title: 'Диета №14', url: 'diet-14' },
            { id: 915, title: 'Без глютена', url: 'gluten-free' },
            { id: 916, title: 'Без аллергенов', url: 'allergen-free' },
        ],
    },
    {
        id: 10,
        title: 'Национальные блюда',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'national-cuisine',
        icon: national,
        subcategories: [
            { id: 1001, title: 'Американская кухня', url: 'american' },
            { id: 1002, title: 'Армянская кухня', url: 'armenian' },
            { id: 1003, title: 'Греческая кухня', url: 'greek' },
            { id: 1004, title: 'Грузинская кухня', url: 'georgian' },
            { id: 1005, title: 'Итальянская кухня', url: 'italian' },
            { id: 1006, title: 'Испанская кухня', url: 'spanish' },
            { id: 1007, title: 'Китайская кухня', url: 'chinese' },
            { id: 1008, title: 'Мексиканская кухня', url: 'mexican' },
            { id: 1009, title: 'Паназиатская кухня', url: 'pan-asian' },
            { id: 1010, title: 'Русская кухня', url: 'russian' },
            { id: 1011, title: 'Турецкая кухня', url: 'turkish' },
            { id: 1012, title: 'Французская кухня', url: 'french' },
            { id: 1013, title: 'Шведская кухня', url: 'swedish' },
            { id: 1014, title: 'Японская кухня', url: 'japanese' },
            { id: 1015, title: 'Другая кухня', url: 'other-cuisine' },
        ],
    },
    {
        id: 11,
        title: 'Соусы',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'sauces',
        icon: sauces,
        subcategories: [
            { id: 1101, title: 'Соусы мясные', url: 'meat-sauces' },
            { id: 1102, title: 'Соусы сырные', url: 'cheese-sauces' },
            { id: 1103, title: 'Маринады', url: 'marinades' },
        ],
    },
    {
        id: 12,
        title: 'Домашние заготовки',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'home-preparations',
        icon: preparations,
        subcategories: [
            { id: 1201, title: 'Мясные заготовки', url: 'meat-preparations' },
            { id: 1202, title: 'Рыбные заготовки', url: 'fish-preparations' },
            { id: 1203, title: 'Из огурцов', url: 'cucumber-preparations' },
            { id: 1204, title: 'Из томатов', url: 'tomato-preparations' },
            { id: 1205, title: 'Из грибов', url: 'mushroom-preparations' },
            { id: 1206, title: 'Овощные заготовки', url: 'vegetable-preparations' },
            { id: 1207, title: 'Салаты, икра', url: 'salads-caviar' },
            { id: 1208, title: 'Из фруктов и ягод', url: 'fruit-preparations' },
        ],
    },
    {
        id: 13,
        title: 'Напитки',
        text: 'Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.',
        url: 'drinks',
        icon: drinks,
        subcategories: [
            { id: 1301, title: 'Соки и фреши', url: 'juices' },
            { id: 1302, title: 'Смузи', url: 'smoothies' },
            { id: 1303, title: 'Компоты', url: 'compotes' },
            { id: 1304, title: 'Кисели', url: 'jelly-drinks' },
            { id: 1305, title: 'Кофе', url: 'coffee' },
            { id: 1306, title: 'Лечебный чай', url: 'medicinal-tea' },
            { id: 1307, title: 'Квас', url: 'kvass' },
            { id: 1308, title: 'Коктейли', url: 'cocktails' },
            { id: 1309, title: 'Алкогольные', url: 'alcoholic' },
        ],
    },
];

const masItemsWithoutId: recipeWithoutId[] = [
    {
        img: img9,
        title: `Солянка с грибами`,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: masDishCategories.find((el) => el.title === 'Первые блюда') as dishCategory,
        bookmarks: 1,
        like: null,
        recommend: masProfiles[0],
    },
    {
        img: img10,
        title: `Капустные котлеты`,
        text: 'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.',
        category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
        bookmarks: 2,
        like: 1,
        recommend: masProfiles[0],
    },
    {
        img: img11,
        title: `Оладьи на кефире "Пышные"`,
        text: 'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: masDishCategories.find((el) => el.title === 'Десерты, выпечка') as dishCategory,
        bookmarks: null,
        like: 1,
    },
    {
        img: img12,
        title: `Салат "Здоровье"`,
        text: 'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.',
        category: masDishCategories.find((el) => el.title === 'Салаты') as dishCategory,
        bookmarks: 1,
        like: 2,
        recommend: masProfiles[0],
    },
    {
        img: img13,
        title: `Кнели со спагетти`,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
        bookmarks: 152,
        like: 85,
    },
    {
        img: img14,
        title: `Пряная ветчина по итальянски`,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
        bookmarks: 257,
        like: 159,
        recommend: masProfiles[1],
    },
    {
        img: img15,
        title: `Лапша с курицей и шафраном`,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
        bookmarks: 342,
        like: 258,
    },
    {
        img: img1,
        title: `Картошка, тушенная с болгарским перцем и фасолью в томатном соусе`,
        text: 'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.',
        category: masDishCategories.find((el) => el.title === 'Национальные блюда') as dishCategory,
        bookmarks: 85,
        like: 152,
    },
    {
        img: img2,
        title: `Картофельные рулетики с грибами`,
        text: 'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!',
        category: masDishCategories.find((el) => el.title === 'Детские блюда') as dishCategory,
        bookmarks: 85,
        like: 152,
    },
    {
        img: img3,
        title: `Том-ям с капустой кимчи`,
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: masDishCategories.find((el) => el.title === 'Национальные блюда') as dishCategory,
        bookmarks: 124,
        like: 324,
    },
    {
        img: img4,
        title: `Овощная лазанья из лаваша`,
        text: 'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.',
        category: masDishCategories.find((el) => el.title === 'Блюда на гриле') as dishCategory,
        bookmarks: 85,
        like: 152,
    },
    {
        img: img5,
        title: `Тефтели из булгура и чечевицы, запечённые в томатном соусе`,
        text: 'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
        bookmarks: 85,
        like: 152,
    },
    {
        img: img6,
        title: `Тефтели из булгура и чечевицы, запечённые в томатном соусе`,
        text: 'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        category: masDishCategories.find((el) => el.title === 'Вторые блюда') as dishCategory,
        bookmarks: 85,
        like: 152,
    },
    {
        img: img7,
        title: `Чесночная картошка`,
        text: 'Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        category: masDishCategories.find((el) => el.title === 'Национальные блюда') as dishCategory,
        bookmarks: 124,
        like: 324,
    },
    {
        img: img8,
        title: `Пури`,
        text: 'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.',
        category: masDishCategories.find((el) => el.title === 'Национальные блюда') as dishCategory,
        bookmarks: 124,
        like: 324,
    },
];
export const masItems: recipe[] = addIdToArray(masItemsWithoutId);
// console.log(masItems);
