import { GridProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Recipe } from '~/store/recipe-filter/recipe.types';

import CardList from './CardList';

type Props = {
    allRecipes: Recipe[];
    dataTestId?: string;
    dataTestIdGrid?: string;
    itemPerPage?: number;
} & GridProps;

export function CardListPaginated({
    allRecipes,
    dataTestId,
    dataTestIdGrid,
    itemPerPage = 8,
    ...gridProps
}: Props) {
    const [visibleCount, setVisibleCount] = useState(itemPerPage);
    const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        setVisibleRecipes(allRecipes.slice(0, visibleCount));
    }, [allRecipes, visibleCount]);

    const isEnd = visibleCount >= allRecipes.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + itemPerPage);
    };

    return (
        <CardList
            list={visibleRecipes}
            isLoading={false}
            isEnd={isEnd}
            onLoadMore={handleLoadMore}
            withButton={true}
            dataTestId={dataTestId}
            dataTestIdGrid={dataTestIdGrid}
            {...gridProps}
        />
    );
}
