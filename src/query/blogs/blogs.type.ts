import { RecipeIngredients, RecipeStep } from '~/store/recipe-filter/recipe.types';

export type blogItem = {
    id: string;
    text: string;
    profile: profile;
    // like: number | null,
    // bookmarks: number | null,
};
export type profile = {
    id: string;
    name: string;
    surname: string;
    username: string;
    img?: string;
    statistics?: Partial<statistics>;
};
export type statistics = {
    like: number | null;
    bookmarks: number | null;
    views: number | null;
};
export type profileWithoutId = Omit<profile, 'id'>;
export type blogItemWithoutId = Omit<blogItem, 'id'>;

export type BloggerNote = {
    _id: string;
    date: string;
    text: string;
};

export type BloggerShortInfo = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: BloggerNote[];
    newRecipesCount: number;
    photoLink: string;
};

export type BloggerDraft = {
    _id: string;
    categoriesIds: string[];
    image: string;
    title: string;
    description: string;
    portions: number;
    time: number;
    ingredients: RecipeIngredients[];
    steps: RecipeStep[];
};

export type BloggerInfo = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    photoLink: string;

    recipesIds: string[];
    drafts: BloggerDraft[];
    subscriptions: string[];
    subscribers: string[];
    notes: BloggerNote[];
};
export type GetAllBloggersRequest = {
    limit?: string;
    currentUserId: string;
};

export type GetAllBloggersResponse = {
    favorites: BloggerShortInfo[];
    others: BloggerShortInfo[];
};

export type GetBloggerByIdRequest = {
    bloggerId: string;
    currentUserId: string;
};

export type GetBloggerByIdResponse = {
    bloggerInfo: BloggerInfo;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};

export type GetBloggerInfoForCard = {
    totalSubscribers: number;
    totalBookmarks: number;
    bloggerInfo?: BloggerInfo;
    isFavorite?: boolean;
    totalLikes?: number;
    totalRecommends?: number;
    isAvailableRecomend?: boolean;
};
