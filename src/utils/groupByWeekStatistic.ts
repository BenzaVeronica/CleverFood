import { format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

import { StatisticItem } from '~/query/statistic/statistic.types';

export const groupByWeekStatistic = (data: StatisticItem[]): StatisticItem[] => {
    if (!data.length) return [];
    const result: StatisticItem[] = [];

    const sortedData = [...data].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const weekMap = new Map<string, number>();

    sortedData.forEach((item) => {
        const weekStart = startOfWeek(new Date(item.date), { weekStartsOn: 1 });
        const key = weekStart.toISOString();

        weekMap.set(key, (weekMap.get(key) || 0) + item.count);
    });

    sortedData.forEach((item) => {
        const itemDate = new Date(item.date);
        const weekStart = startOfWeek(itemDate, { weekStartsOn: 1 });
        let currentWeekStart = startOfWeek(new Date(sortedData[0].date), { weekStartsOn: 1 });
        let currentWeekCount = 0;

        if (weekStart.getTime() === currentWeekStart.getTime()) {
            currentWeekCount += item.count;
        } else {
            result.push({
                date: format(currentWeekStart, 'MMM d', { locale: ru }),
                count: currentWeekCount,
            });

            currentWeekStart = weekStart;
            currentWeekCount = item.count;
        }

        result.push({
            date: format(currentWeekStart, 'MMM d', { locale: ru }),
            count: currentWeekCount,
        });
    });

    return result;
};
