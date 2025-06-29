import { Box, VStack } from '@chakra-ui/react';
import { ElementType } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { StatisticItem } from '~/query/statistic/statistic.types';
import { groupByWeekStatistic } from '~/utils/groupByWeekStatistic';

import StatTitle from '../UI/StatTitle';

type Props = {
    icon: ElementType;
    title: string;
    data: StatisticItem[] | undefined;
    color?: string;
};

export function StatisticsChart({ icon, title, data, color = '#2DB100' }: Props) {
    const weekData = data && groupByWeekStatistic(data);
    return (
        <VStack width='100%' alignItems='start'>
            <StatTitle icon={icon}>{title}</StatTitle>
            {data?.length && (
                <Box width='100%' overflowX='auto'>
                    <Box minWidth='600px'>
                        <ResponsiveContainer width='100%' height={300}>
                            <LineChart
                                data={weekData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis
                                    dataKey='date'
                                    tick={({ x, y, payload, index }) => {
                                        if (index === 0) return <g />;
                                        return (
                                            <text x={x} y={y + 16} textAnchor='middle' fill='#666'>
                                                {payload.value}
                                            </text>
                                        );
                                    }}
                                />
                                <YAxis
                                    domain={[0, 'dataMax']}
                                    ticks={[0, 20, 40, 60, 80, 100, 120]}
                                />
                                <Tooltip
                                    formatter={(value) => [value, 'Количество']}
                                    labelFormatter={(label) => `Неделя: ${label}`}
                                />
                                <Line
                                    type='monotone'
                                    dataKey='count'
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 6 }}
                                    stroke={color}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            )}
        </VStack>
    );
}
