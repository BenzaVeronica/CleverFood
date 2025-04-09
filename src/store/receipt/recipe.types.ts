export type item = {
    title: string;
    text: string;
    category: dishCategory;
    like: number | null;
    bookmarks: number | null;
};
export type dishCategory = {
    id: number;
    title: string;
    url: string;
    icon: string;
    subcategories: dishSubcategory[];
};
export type dishCategoryWithoutId = Omit<dishCategory, 'id'>;
export type itemWithoutId = Omit<item, 'id'>;
export type dishSubcategory = {
    id: number;
    title: string;
    url: string;
};
