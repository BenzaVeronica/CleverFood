import { Recipe } from '~/store/recipe-filter/recipe.types';

export type Statistic = {
    likes: StatisticItem[];
    bookmarks: StatisticItem[];
    recommendationsCount: number;
    recipesWithRecommendations: Recipe[];
};

export type StatisticItem = {
    date: string;
    count: number;
};

export type StatisticItemDate = {
    date: Date;
    count: number;
};
