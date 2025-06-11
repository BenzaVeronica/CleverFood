import { GridProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ErrorDescEnum } from '~/query/errors/error.constants';
import { CustomErrorResponse, ErrorQuery } from '~/query/errors/error.type';
import { RecipesResponse } from '~/query/recipe/recipe.types';
import { ResponseParams, ResponseParamsWithId } from '~/query/types';
import { useAppDispatch } from '~/store/hooks';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { addError } from '~/widgets/error/error-slice';
import ErrorNotification from '~/widgets/error/ErrorNotification';

import CardList from './CardList';

type CardListPaginatedProps<P extends ResponseParams | ResponseParamsWithId> = {
    queryHook: (params: P) => {
        data?: RecipesResponse;
        isFetching: boolean;
        error?: ErrorQuery;
        isError: boolean;
    };
    queryParams: P;
    dataTestId?: string;
    shouldReset?: boolean;
} & GridProps;

function CardListQueryPaginated<P extends ResponseParams | ResponseParamsWithId>({
    queryHook,
    queryParams,
    dataTestId,
    shouldReset,
    ...gridProps
}: CardListPaginatedProps<P>) {
    const [page, setPage] = useState(1);

    const { data, isFetching, error, isError } = queryHook({
        ...queryParams,
        page,
    });

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isEnd, setIsEnd] = useState(false);
    useEffect(() => {
        if (data?.data) {
            setRecipes((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
            const lastPage = data.meta?.totalPages;
            if (page >= lastPage || data.data.length < queryParams.limit) {
                setIsEnd(true);
            }
        }
    }, [data]);

    useEffect(() => {
        if (shouldReset) {
            setPage(1);
            setRecipes([]);
            setIsEnd(false);
        }
    }, [shouldReset]);

    const handleLoadMore = () => {
        if (!isEnd) setPage((prev) => prev + 1);
    };

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!error) return;
        const typedError = error as CustomErrorResponse;
        dispatch(
            addError({
                title: typedError.title,
                description: ErrorDescEnum.SEARCH,
            }),
        );
    }, [error]);

    if (isError) return <ErrorNotification />;
    return (
        <CardList
            list={recipes}
            isLoading={isFetching}
            isEnd={isEnd}
            onLoadMore={handleLoadMore}
            withButton={true}
            dataTestId={dataTestId}
            {...gridProps}
        />
    );
}

export default CardListQueryPaginated;
