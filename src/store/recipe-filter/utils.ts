import { Recipe } from './recipe.types';
import { RecipeFilterState } from './recipe-filter-slice';

export function sortByNewest(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
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

export const hasAnyFilter = (state: RecipeFilterState): boolean =>
    Boolean(
        state.searchQuery ||
            state.categories.length ||
            state.author.length ||
            state.allergens.length ||
            state.meatTypes.length ||
            state.sideDishes.length,
    );
