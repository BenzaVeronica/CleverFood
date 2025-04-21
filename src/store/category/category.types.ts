import { profile } from '../blog/blog.types';

export type recipeItem = {
    id: number;
    img: string;
    title: string;
    text: string;
    category: dishCategory;
    like: number | null;
    bookmarks: number | null;
    recommend?: profile;
};
export type dishCategory = {
    id: string;
    title: string;
    text: string;
    url: string;
    icon: string;
    subcategories: dishSubcategory[];
};
export type dishCategoryWithoutId = Omit<dishCategory, 'id'>;
export type recipeWithoutId = Omit<recipeItem, 'id'>;
export type dishSubcategory = {
    id: number;
    title: string;
    url: string;
};
