import { HStack } from '@chakra-ui/react';
import { ElementType } from 'react';

import StatTitle from '../UI/StatTitle';

type Props = {
    icon: ElementType;
    title: string;
};

export function StatisticsChart({ icon, title }: Props) {
    return (
        <HStack>
            <StatTitle icon={icon}>{title}</StatTitle>
        </HStack>
    );
}
