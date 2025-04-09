import React from 'react';

function CategoryPage() {
    return <div></div>;
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
