import { masDishCategories } from '../category/category.constants';
import { recipe } from './recipe.types';

export function sortByNewest(recipes: recipe[]): recipe[] {
    return [...recipes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function sortByField<T>(items: T[], path: string, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...items].sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const getValue = (obj: any, path: string) => path.split('.').reduce((o, p) => o?.[p], obj);

        const valueA = getValue(a, path);
        const valueB = getValue(b, path);

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return direction === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }

        if (valueA instanceof Date && valueB instanceof Date) {
            return direction === 'asc'
                ? valueA.getTime() - valueB.getTime()
                : valueB.getTime() - valueA.getTime();
        }

        return direction === 'asc'
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
    });
}

// export function filterBySubCategory(
//     items: recipe[],
//     categoryId: string | undefined,
//     subcategoryId: string | undefined,
// ): recipe[] {
//     if (!categoryId || !subcategoryId) return [];

//     return items.filter((recipe) => {
//         const categoryIndex = recipe.category.findIndex((cat) => cat === categoryId);
//         if (categoryIndex === -1) return false;

//         return recipe.subcategory[categoryIndex] === subcategoryId;
//     });
// }
const categoryToSubcategories: Record<string, string[]> = {};
masDishCategories.forEach((category) => {
    categoryToSubcategories[category.url] = category.subcategories.map((sub) => sub.url);
});
export function filterBySubCategory(
    items: recipe[],
    categoryUrl: string | undefined,
    subcategoryUrl: string | undefined,
): recipe[] {
    if (!categoryUrl || !subcategoryUrl) return [];

    const allowedSubcategories = categoryToSubcategories[categoryUrl] || [];

    return items.filter((recipe) => {
        const isInCategory = recipe.category.includes(categoryUrl);
        if (!isInCategory) return false;

        return (
            recipe.subcategory.includes(subcategoryUrl) &&
            allowedSubcategories.includes(subcategoryUrl)
        );
    });
}
