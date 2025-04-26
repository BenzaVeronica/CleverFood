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
import imgMain from '../../assets/imgRecipes/image.jpg';
import recipeStepimg1 from '../../assets/recipeSteps/image.jpg';
import recipeStepimg2 from '../../assets/recipeSteps/image1.jpg';
import recipeStepimg3 from '../../assets/recipeSteps/image2.jpg';
import recipeStepimg4 from '../../assets/recipeSteps/image3.jpg';
import recipeStepimg5 from '../../assets/recipeSteps/image4.jpg';
import recipeStepimg6 from '../../assets/recipeSteps/image5.jpg';

export const MAS_RECIPES = [
    {
        id: '0',
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, - вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт добавления томатной пасты.',
        category: ['vegan', 'second-dish'],
        subcategory: ['snacks', 'vegetables'],
        image: img10,
        bookmarks: 85,
        likes: 152,
        date: '2025-02-28T00:00:00Z',
        time: '40 минут',
        portions: 2,
        nutritionValue: { calories: 250, proteins: 5, fats: 8, carbohydrates: 40 },
        ingredients: [
            { title: 'картошка', count: '4', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '2', measureUnit: 'шт.' },
            { title: 'фасоль', count: '200', measureUnit: 'г' },
            { title: 'томатный соус', count: '200', measureUnit: 'мл' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать картошку и перец.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Обжарить лук до золотистого цвета.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Добавить картошку, перец и фасоль, залить соусом.',
                image: recipeStepimg3,
            },
            {
                stepNumber: 4,
                description: 'Тушить на медленном огне 30 минут.',
                image: recipeStepimg4,
            },
        ],
        meat: '',
        side: 'potatoes',
    },
    {
        id: '1',
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов. Готовится это блюдо без яиц, без мяса и без сыра, из самых простых ингредиентов, а получается очень вкусно и сытно. Постный рецепт картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и даже на праздничный стол!',
        category: ['vegan', 'snacks'],
        subcategory: ['snacks', 'warm-snacks'],
        image: img1,
        bookmarks: 85,
        likes: 1152,
        date: '2024-02-20T00:00:00Z',
        time: '30 минут',
        portions: 2,
        nutritionValue: { calories: 180, proteins: 4, fats: 6, carbohydrates: 28 },
        ingredients: [
            { title: 'картошка', count: '3', measureUnit: 'шт.' },
            { title: 'грибы', count: '200', measureUnit: 'г' },
            { title: 'мука', count: '100', measureUnit: 'г' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Отварить картошку и сделать пюре.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Обжарить грибы до готовности.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Сформировать рулетики и обжарить.',
                image: recipeStepimg3,
            },
        ],
        side: 'potatoes',
    },
    {
        id: '2',
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья готовится с овощным соусом и соусом бешамель, а вместо листов для лазаньи используется тонкий лаваш.',
        category: ['vegan', 'second-dish', 'national'],
        subcategory: ['second-dish', 'vegetables', 'italian', 'snacks'],
        image: img2,
        bookmarks: 85,
        likes: 152,
        date: '2023-01-25T00:00:00Z',
        time: '1 час',
        portions: 1,
        nutritionValue: { calories: 300, proteins: 12, fats: 8, carbohydrates: 45 },
        ingredients: [
            { title: 'лаваш', count: '3', measureUnit: 'листов' },
            { title: 'овощной соус', count: '300', measureUnit: 'мл' },
            { title: 'соус бешамель', count: '200', measureUnit: 'мл' },
            { title: 'сыр', count: '100', measureUnit: 'г' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Приготовить соусы.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Сложить слои лазаньи.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Запекать 30 минут.',
                image: recipeStepimg3,
            },
        ],
    },
    {
        id: '3',
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        category: ['vegan', 'second-dish'],
        subcategory: ['second-dish', 'poultry-dish'],
        image: img3,
        bookmarks: 85,
        likes: 152,
        date: '2023-02-15T00:00:00Z',
        time: '50 минут',
        portions: 4,
        nutritionValue: { calories: 200, proteins: 10, fats: 5, carbohydrates: 30 },
        ingredients: [
            { title: 'булгур', count: '150', measureUnit: 'г' },
            { title: 'чечевица', count: '100', measureUnit: 'г' },
            { title: 'томатный соус', count: '200', measureUnit: 'мл' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Смешать булгур и чечевицу.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Сформировать тефтели и запечь.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Подавать с соусом.',
                image: recipeStepimg3,
            },
        ],
    },
    {
        id: '4',
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        category: ['vegan', 'second-dish'],
        subcategory: ['side-dishes', 'second-dish', 'vegetables'],
        image: img4,
        bookmarks: 124,
        likes: 342,
        date: '2024-03-01T00:00:00Z',
        time: '30 минут',
        portions: 2,
        nutritionValue: { calories: 220, proteins: 4, fats: 7, carbohydrates: 35 },
        ingredients: [
            { title: 'картошка', count: '6', measureUnit: 'шт.' },
            { title: 'чеснок', count: '5', measureUnit: 'зубчиков' },
            { title: 'масло', count: '50', measureUnit: 'мл' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Очистить и нарезать картошку.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Обжарить с чесноком.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Подавать горячей.',
                image: recipeStepimg3,
            },
        ],
        side: 'potatoes',
    },
    {
        id: '5',
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных блюд.',
        category: ['vegan'],
        subcategory: ['second-dish', 'snacks'],
        image: img5,
        bookmarks: 2,
        likes: 1,
        date: '2024-02-05T00:00:00Z',
        time: '35 минут',
        portions: 4,
        nutritionValue: { calories: 150, proteins: 5, fats: 4, carbohydrates: 20 },
        ingredients: [
            { title: 'капуста', count: '300', measureUnit: 'г' },
            { title: 'мука', count: '50', measureUnit: 'г' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать капусту и отварить.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Смешать с мукой и сформировать котлеты.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Обжарить до золотистой корочки.',
                image: recipeStepimg3,
            },
        ],
    },
    {
        id: '6',
        title: 'Овощное рагу',
        description: 'Сытное рагу из сезонных овощей, приправленное травами.',
        category: ['vegan', 'second-dish'],
        subcategory: ['side-dishes', 'vegetables', 'snacks'],
        image: img6,
        bookmarks: 8,
        likes: 60,
        date: '2023-03-12T00:00:00Z',
        time: '1 час',
        portions: 2,
        nutritionValue: { calories: 200, proteins: 5, fats: 8, carbohydrates: 30 },
        ingredients: [
            { title: 'цуккини', count: '1', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '1', measureUnit: 'шт.' },
            { title: 'морковь', count: '1', measureUnit: 'шт.' },
            { title: 'картошка', count: '2', measureUnit: 'шт.' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать все овощи.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Обжарить на сковороде.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Добавить специи и тушить до готовности.',
                image: recipeStepimg3,
            },
        ],
    },
    {
        id: '7',
        title: 'Лапша с курицей и шафраном',
        description: 'Ароматная лапша с курицей и шафраном, идеальное сочетание для сытного обеда.',
        category: ['second-dish'],
        subcategory: ['poultry-dish'],
        image: img7,
        bookmarks: 258,
        likes: 1342,
        date: '2024-03-08T00:00:00Z',
        time: '40 минут',
        portions: 4,
        nutritionValue: { calories: 400, proteins: 30, fats: 15, carbohydrates: 50 },
        ingredients: [
            { title: 'лапша', count: '200', measureUnit: 'г' },
            { title: 'курица', count: '300', measureUnit: 'г' },
            { title: 'шафран', count: '1', measureUnit: 'ч. л.' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Отварить лапшу.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Обжарить курицу с луком и шафраном.',
                image: recipeStepimg2,
            },
            {
                stepNumber: 3,
                description: 'Смешать лапшу с курицей и подавать.',
                image: recipeStepimg3,
            },
        ],
    },
    {
        id: '8',
        title: 'Гриль-салат с овощами',
        description: 'Салат с обжаренными на гриле овощами и легкой заправкой.',
        category: ['salads'],
        subcategory: ['warm-salads'],
        image: img8,
        bookmarks: 10,
        portions: 2,
        likes: 80,
        date: '2023-03-20T00:00:00Z',
        time: '25 минут',
        nutritionValue: { calories: 150, proteins: 4, fats: 6, carbohydrates: 20 },
        ingredients: [
            { title: 'цуккини', count: '1', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '1', measureUnit: 'шт.' },
            { title: 'баклажан', count: '1', measureUnit: 'шт.' },
            { title: 'оливковое масло', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Обжарить овощи на гриле.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Смешать с заправкой и подавать.',
                image: recipeStepimg2,
            },
        ],
    },
    {
        id: '9',
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: ['salads'],
        subcategory: ['warm-salads'],
        image: img9,
        bookmarks: 10,
        portions: 2,
        likes: 80,
        date: '2023-03-20T00:00:00Z',
        time: '25 минут',
        nutritionValue: { calories: 150, proteins: 4, fats: 6, carbohydrates: 20 },
        ingredients: [
            { title: 'цуккини', count: '1', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '1', measureUnit: 'шт.' },
            { title: 'баклажан', count: '1', measureUnit: 'шт.' },
            { title: 'оливковое масло', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Обжарить овощи на гриле.',
                image: recipeStepimg1,
            },
            {
                stepNumber: 2,
                description: 'Смешать с заправкой и подавать.',
                image: recipeStepimg2,
            },
        ],
    },
];

export const RECIPE_FOR_TEST_PAGE = {
    id: '9',
    title: 'Лапша с курицей и шафраном',
    description: 'Салат с обжаренными на гриле овощами и легкой заправкой.',
    category: ['second-courses', 'children-dishes', 'national'],
    subcategory: ['warm-salads'],
    image: imgMain,
    portions: 2,
    bookmarks: 10,
    likes: 80,
    date: '2023-03-20T00:00:00Z',
    time: '25 минут',
    nutritionValue: { calories: 150, proteins: 4, fats: 6, carbohydrates: 20 },
    ingredients: [
        { title: 'зелёного лука', count: '1', measureUnit: 'пучок' },
        { title: 'репчатого лука', count: '1', measureUnit: 'шт' },
        { title: 'чеснока', count: '1', measureUnit: 'зубчик' },
        { title: 'куриного филе ', count: '500', measureUnit: 'г' },
        { title: 'масла или жира ', count: '40', measureUnit: 'г' },
        { title: 'спагетти', count: '250', measureUnit: 'г' },
        { title: 'молотого шафрана', count: '1', measureUnit: 'щепотка' },
        { title: 'молотой корицы', count: '1', measureUnit: 'щепотка' },
        { title: 'муки ', count: '1', measureUnit: ' ст л' },
        { title: 'сливок ', count: '250', measureUnit: 'мл' },
        { title: 'куриного бульона из кубика ', count: '200', measureUnit: 'мл' },
        { title: 'нарезанной петрушки ', count: '2', measureUnit: ' ст л' },
    ],
    steps: [
        {
            stepNumber: 1,
            description: 'Зелёный лук нарезать на 1 см. кружочки. Лук и чеснок на мелкие кубики.  ',
            image: recipeStepimg1,
        },
        {
            stepNumber: 2,
            description:
                'Мясо помыть, высушить, нарезать на полосочки и обжарить на масле.  Посолить, поперчить и вынуть со сковороды.',
            image: recipeStepimg2,
        },
        {
            stepNumber: 3,
            description: 'Спагетти отварить в течение  10 минут в подсоленной воде.',
            image: recipeStepimg3,
        },
        {
            stepNumber: 4,
            description:
                'В сковороде, на оставшемся жире поджарить лук до золотистого цвета, добавить чеснок и прожарить ещё около 1 минуты.',
            image: recipeStepimg4,
        },
        {
            stepNumber: 5,
            description: 'Всыпать шафран, корицу и муки, перемешать и коротко прожарить.',
            image: null,
        },
        {
            stepNumber: 6,
            description:
                'В сковороде, на оставшемся жире поджарить лук до золотистого цвета, добавить чеснок и прожарить ещё около 1 минуты.',
            image: recipeStepimg5,
        },
        {
            stepNumber: 7,
            description:
                'Сливки смешать с бульоном, влить к луку и протушить на среднем огне около 10 минут.',
            image: null,
        },
        {
            stepNumber: 8,
            description:
                'Соус посолить, поперчить, вложить мясо, зелёный лук. Прогреть и осторожно смешать со спагетти. При подаче посыпать нарезанной петрушкой.',
            image: recipeStepimg6,
        },
    ],
};
