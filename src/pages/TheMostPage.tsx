import { Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo } from 'react';

import { ContainerBoxLayout } from '~/app/ContainerAppLayout';
import CardListPaginated from '~/components/CardList/CardListPaginated';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import LoaderScreen from '~/components/UI/Loader/LoaderScreen';
import WithLoadingError from '~/components/WithLoadingError';
import { useGetNavTreeQuery } from '~/query/category/category.api';
import { getRandomSubCategoryId } from '~/query/category/category.utils';
import { useGetRecipesBySubcategoryIdQuery, useGetRecipesQuery } from '~/query/recipe/recipe.api';
import { ABOUT_PARAMS, POPULAR_PARAMS } from '~/query/recipe/recipe.constants';
import { CustomErrorResponse } from '~/query/types';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { useAllQueriesFinished } from '~/utils/useAllQueriesFinished';
import { addError } from '~/widgets/error/error-slice';

function TheMostPage() {
    const navTree = useGetNavTreeQuery();
    const dispatch = useAppDispatch();
    const { subCategories } = useAppSelector(selectCategoriesWithSubs);
    const hasSubCategories = subCategories.length > 0;
    const randomSubCategoryId = useMemo(() => {
        if (!hasSubCategories) return null;
        return getRandomSubCategoryId(subCategories);
    }, [hasSubCategories, subCategories]);
    const about = useGetRecipesBySubcategoryIdQuery(
        randomSubCategoryId ? { id: randomSubCategoryId, ...ABOUT_PARAMS } : skipToken,
    );
    const isAllLoaded = useAllQueriesFinished([navTree, about]);

    useEffect(() => {
        if (!isAllLoaded) return;
        const errors = [navTree, about]
            .filter((item) => item.isError)
            .map((item) => item.error as CustomErrorResponse);

        if (errors.length > 0) {
            errors.forEach((err) => {
                dispatch(
                    addError({
                        title: err.title,
                        description: err.message,
                    }),
                );
            });
        }
    }, [dispatch, isAllLoaded, navTree, about]);

    if (!isAllLoaded) {
        return <LoaderScreen />;
    }
    return (
        <ContainerBoxLayout>
            <Flex direction='column' alignItems='center'>
                <CategoryTopFilter title='Самое сочное' />
            </Flex>
            <CardListPaginated
                queryHook={useGetRecipesQuery}
                queryParams={POPULAR_PARAMS}
                dataTestId='load-more-button'
            />
            <WithLoadingError
                isLoading={about.isLoading}
                isError={about.isError}
                isExist={!!about.data?.data.length}
            >
                <SectionAbout
                    items={about.data?.data || []}
                    randomSubCategoryId={randomSubCategoryId}
                />
            </WithLoadingError>
        </ContainerBoxLayout>
    );
}

export default TheMostPage;
