import {
    Box,
    Button,
    Grid,
    GridItem,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import { desert } from '~/components/SectionAbout/recipes.constants';
import { masDishCategories, masItems } from '~/store/recipe/recipe.constants';

import ArrowLongRight from '../assets/iconArrowLongRight.svg?react';

function CategoryPage() {
    const { categoryId, subcategoryId } = useParams();
    const currentCategory = masDishCategories.find((cat) => cat.url === categoryId);
    // console.log(masItems);

    // const currentSubcategory = currentCategory?.subcategories?.find(sub => sub.url === subcategoryId);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [subcategoryId]);

    return (
        <Grid
            templateColumns='repeat(12, 1fr)'
            ml={{ base: 4, md: 5, lg: 6 }}
            mr={{ base: 4, md: 5, lg: '72px' }}
        >
            <GridItem colStart={3} colSpan={8}>
                {currentCategory && (
                    <CategoryTopFilter title={currentCategory.title} text={currentCategory.text} />
                )}
            </GridItem>
            <GridItem colSpan={12}>
                <Tabs
                    // mt={4}
                    isLazy
                    defaultIndex={
                        currentCategory?.subcategories.findIndex(
                            (el) => el.url === subcategoryId,
                        ) || 0
                    }
                    // border={'none'}
                >
                    <Box
                        overflowX='auto'
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '0',
                            },
                        }}
                    >
                        <TabList
                            width='fit-content'
                            margin='0 auto'
                            overflowY='hidden'
                            pb={0}
                            whiteSpace='nowrap'
                            border='none'
                        >
                            {currentCategory?.subcategories.map((el, _index) => (
                                <Tab
                                    key={`CategoryPage_Tab_${el.id}`}
                                    color='lime.800'
                                    borderColor='blackAlpha.200'
                                    borderBottomWidth='1px'
                                    marginBottom='1px'
                                    _selected={{
                                        color: 'lime.600',
                                        borderColor: 'lime.600',
                                        // marginBottom: '-2px',
                                        marginBottom: '0',
                                        borderBottomWidth: '2px',
                                    }}
                                >
                                    {el.title}
                                </Tab>
                            ))}
                        </TabList>
                    </Box>
                    <TabPanels>
                        {currentCategory?.subcategories.map((el, _index) => (
                            <TabPanel pt={3} pb={0} px={0} key={`CategoryPage_TabPanel_${el.id}`}>
                                <CardList item={el} list={masItems.slice(7)} />
                                <Button
                                    display='block'
                                    mx='auto'
                                    mt={4}
                                    rightIcon={<Icon as={ArrowLongRight} />}
                                    bg='lime.300'
                                    _hover={{
                                        bg: 'lime.500',
                                        color: 'white',
                                        '& path': {
                                            fill: 'white',
                                        },
                                    }}
                                    fontSize='lg'
                                    fontWeight='semibold'
                                >
                                    Загрузить еще
                                </Button>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </GridItem>
            <GridItem colSpan={12}>
                <SectionAbout item={desert} />
            </GridItem>
        </Grid>
    );
}

export default CategoryPage;

// import React from 'react';
// import { useParams, Outlet } from 'react-router-dom';
// import { masDishCategories } from './receipt.constants';

// export function CategoryPage() {
//   const { categoryId, subcategoryId } = useParams();

//   // Находим текущую категорию
//   const currentCategory = masDishCategories.find(
//     cat => cat.url === categoryId
//   );

//   // Находим текущую подкатегорию
//   const currentSubcategory = currentCategory?.subcategories?.find(
//     sub => sub.url === subcategoryId
//   );

//   // Определяем уровень вложенности
//   const level = subcategoryId ? 2 : categoryId ? 1 : 0;

//   return (
//     <div className="category-page">
//       {/* Хлебные крошки */}
//       <nav className="breadcrumbs">
//         <Link to="/categories">Все категории</Link>
//         {currentCategory && (
//           <>
//             <span> / </span>
//             <Link to={`/categories/${currentCategory.url}`}>
//               {currentCategory.title}
//             </Link>
//           </>
//         )}
//         {currentSubcategory && (
//           <>
//             <span> / </span>
//             <span>{currentSubcategory.title}</span>
//           </>
//         )}
//       </nav>

//       {/* Отображаем контент в зависимости от уровня вложенности */}
//       {level === 0 && <AllCategoriesView />}
//       {level === 1 && <CategoryView category={currentCategory} />}
//       {level === 2 && (
//         <SubcategoryView
//           category={currentCategory}
//           subcategory={currentSubcategory}
//         />
//       )}

//       {/* Outlet для возможных дополнительных вложений */}
//       <Outlet />
//     </div>
//   );
// }

// // Компоненты для разных уровней
// function AllCategoriesView() {
//   return (
//     <div>
//       <h2>Все категории</h2>
//       <div className="categories-grid">
//         {masDishCategories.map(category => (
//           <Link
//             key={category.id}
//             to={`/categories/${category.url}`}
//             className="category-card"
//           >
//             <img src={category.icon} alt={category.title} />
//             <h3>{category.title}</h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// function CategoryView({ category }: { category: dishCategory }) {
//   return (
//     <div>
//       <h2>{category.title}</h2>
//       <div className="subcategories-grid">
//         {category.subcategories?.map(sub => (
//           <Link
//             key={sub.id}
//             to={`/categories/${category.url}/${sub.url}`}
//             className="subcategory-card"
//           >
//             <h4>{sub.title}</h4>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// function SubcategoryView({
//   category,
//   subcategory
// }: {
//   category: dishCategory,
//   subcategory: dishCategory
// }) {
//   // Здесь можно получать блюда для этой подкатегории
//   const dishes = masItems.filter(item =>
//     item.category.url === category.url &&
//     item.category.subcategories?.some(s => s.url === subcategory.url)
//   );

//   return (
//     <div>
//       <h2>{category.title} / {subcategory.title}</h2>
//       <div className="dishes-list">
//         {dishes.map(dish => (
//           <div key={dish.id} className="dish-card">
//             <h3>{dish.title}</h3>
//             <p>{dish.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
