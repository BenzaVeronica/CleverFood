import { useGetStatisticQuery } from '../statistic/statistic.api';
import { useGetAllUsersQuery, useGetUserMeQuery } from './user.api';

const MIN_BOOKMARKS = 200;
const MIN_SUBSCRIBERS = 100;
export function isRecommendationAllowed(
    totalBookmarks: number | undefined,
    totalSubscribers: number | undefined,
): boolean {
    return (totalBookmarks ?? 0) >= MIN_BOOKMARKS && (totalSubscribers ?? 0) >= MIN_SUBSCRIBERS;
}

export function useUsersByListId(subscriberIds: string[]) {
    const { data: users } = useGetAllUsersQuery(undefined, {
        skip: subscriberIds.length === 0,
    });
    if (!users || subscriberIds.length === 0) return [];
    // return users.filter((user) => subscriberIds.includes(user.id));
    return subscriberIds.map((id) => users.find((user) => user.id === id));
}

export function useUserByUserId(userId: string | undefined) {
    const { data: users } = useGetAllUsersQuery(undefined, {
        skip: !userId,
    });
    return users?.find((u) => u.id === userId) ?? null;
}

export function useGetStatFromBloggerByIdAndStat() {
    // const { user } = useAuth();
    const { data } = useGetUserMeQuery();
    // const { data } = useGetBloggerByIdQuery(
    //     {
    //         bloggerId: user?.userId ?? '',
    //         currentUserId: user?.userId ?? '',
    //     },
    //     {
    //         skip: !user?.userId,
    //     },
    // );
    const { data: stat } = useGetStatisticQuery();
    const totalBookmarks = stat?.bookmarks.reduce((sum, el) => sum + el.count, 0) ?? 0;
    const totalSubscribers = data?.subscribers.length ?? 0;

    return {
        bloggerInfo: data,
        totalBookmarks: totalBookmarks,
        totalSubscribers: totalSubscribers,
        totalLikes: stat?.likes.reduce((sum, el) => sum + el.count, 0) ?? 0,
        totalRecommends: stat?.recommendationsCount ?? 0,
        isAvailableRecomend: isRecommendationAllowed(totalBookmarks, totalSubscribers),
    };
}
