import { StackProps, VStack } from '@chakra-ui/react';

import OkIcon from '~/assets/ok-filled.svg?react';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { pluralizeRecomendationRecipes } from '~/utils/pluralizeRecipes';

import CardList from '../CardList';
import StatTitle from '../UI/StatTitle';

type Props = {
    length: number;
    data: Recipe[] | undefined;
} & StackProps;

export function StatisticsRecommendations({ length, data = [], ...rest }: Props) {
    return (
        <VStack {...rest} alignItems='start' w='120%' mt={10}>
            <StatTitle icon={OkIcon}>{pluralizeRecomendationRecipes(length)}</StatTitle>
            <CardList list={data} withButton={false} mt={3} />
        </VStack>
    );
}
