import { GridProps } from '@chakra-ui/react';

import { useGetRecipesQuery } from '~/query/recipe/recipe.api';
import { useFilterParams } from '~/store/recipe-filter/useFilterParams';

import CardListPaginated from './CardListPaginated';

type Props = {
    dataTestId?: string;
} & GridProps;

function CardListWithFilter({ dataTestId, ...gridProps }: Props) {
    const filterParams = useFilterParams();
    return (
        <CardListPaginated
            queryHook={useGetRecipesQuery}
            queryParams={filterParams}
            {...gridProps}
            dataTestId={dataTestId}
        />
    );
}

export default CardListWithFilter;
