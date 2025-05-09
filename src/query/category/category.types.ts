export interface BaseCategory {
    _id: string;
    title: string;
    category: string;
}
export interface RootCategory extends BaseCategory {
    description: string;
    icon: string;
    subCategories: SubCategory[];
}
export interface SubCategory extends BaseCategory {
    rootCategoryId: string;
}
export type AllVariantsCategory = RootCategory | SubCategory;

export type CategoriesResponse = AllVariantsCategory[];

export interface GetCategoryBySubCategoryIdProps {
    categories: RootCategory[];
    subCategories: SubCategory[];
    subCategoryId: string;
}
export type GetCategoryBySubCategoryId = (
    props: GetCategoryBySubCategoryIdProps,
) => { category: RootCategory; subCategory: SubCategory } | null;

export interface GetFullPathBySubCategoryIdProps extends GetCategoryBySubCategoryIdProps {
    id: string;
}
export type GetFullPathBySubCategoryId = (props: GetFullPathBySubCategoryIdProps) => string;

export interface GetUniqueCategoriesBySubCategoryIdsProps {
    categories: RootCategory[];
    subCategories: SubCategory[];
    subCategoriesIds: string[];
}
export type GetUniqueCategoriesBySubCategoryIds = (
    props: GetUniqueCategoriesBySubCategoryIdsProps,
) => RootCategory[];

export interface GetRandomSubCategoryIdByCategoryProp {
    categories: RootCategory[];
    categoryId: string;
}
export type GetRandomSubCategoryIdByCategory = (
    props: GetRandomSubCategoryIdByCategoryProp,
) => string | null;

// export type GetAllSubCategoryIdsByCategoryId = (
//     props: GetRandomSubCategoryIdByCategoryProp,
// ) => SubCategory[] | null;

export type GetAllSubCategoryIdsByCategoryIds = (
    categories: RootCategory[],
    categoryIds: string[],
) => string[];
