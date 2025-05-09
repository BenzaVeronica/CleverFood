export type BaseCategory = {
    _id: string;
    title: string;
    category: string;
};

export type RootCategory = BaseCategory & {
    description: string;
    icon: string;
    subCategories: SubCategory[];
};

export type SubCategory = BaseCategory & {
    rootCategoryId: string;
};

export type AllVariantsCategory = RootCategory | SubCategory;

export type CategoriesResponse = AllVariantsCategory[];

export type GetCategoryBySubCategoryIdProps = {
    categories: RootCategory[];
    subCategories: SubCategory[];
    subCategoryId: string;
};

export type GetCategoryBySubCategoryId = (
    props: GetCategoryBySubCategoryIdProps,
) => { category: RootCategory; subCategory: SubCategory } | null;

export type GetFullPathBySubCategoryIdProps = GetCategoryBySubCategoryIdProps & {
    id: string;
};

export type GetFullPathBySubCategoryId = (props: GetFullPathBySubCategoryIdProps) => string;

export type GetUniqueCategoriesBySubCategoryIdsProps = {
    categories: RootCategory[];
    subCategories: SubCategory[];
    subCategoriesIds: string[];
};

export type GetUniqueCategoriesBySubCategoryIds = (
    props: GetUniqueCategoriesBySubCategoryIdsProps,
) => RootCategory[];

export type GetRandomSubCategoryIdByCategoryProp = {
    categories: RootCategory[];
    categoryId: string;
};

export type GetRandomSubCategoryIdByCategory = (
    props: GetRandomSubCategoryIdByCategoryProp,
) => string | null;

export type GetAllSubCategoryIdsByCategoryIds = (
    categories: RootCategory[],
    categoryIds: string[],
) => string[];
