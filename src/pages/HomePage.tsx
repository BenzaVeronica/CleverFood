import { Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo } from 'react';

import { ContainerBoxLayout } from '~/app/ContainerAppLayout';
import CardListWithFilter from '~/components/CardList/CardListWithFilter';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import NewRecipeSlider from '~/components/NewRecipeSlider';
import SectionAbout from '~/components/SectionAbout';
import SectionBlog from '~/components/SectionBlog';
import SectionTheMost from '~/components/SectionTheMost';
import LoaderScreen from '~/components/UI/Loader/LoaderScreen';
import WithLoadingError from '~/components/WithLoadingError';
import { useGetNavTreeQuery } from '~/query/category/category.api';
import { getRandomSubCategoryId } from '~/query/category/category.utils';
import { ErrorDescEnum } from '~/query/errors/error.constants';
import { useGetRecipesBySubcategoryIdQuery, useGetRecipesQuery } from '~/query/recipe/recipe.api';
import { ABOUT_PARAMS, POPULAR_MAIN_PARAMS, SLIDER_PARAMS } from '~/query/recipe/recipe.constants';
import { CustomErrorResponse } from '~/query/types';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';
import { useAllQueriesFinished } from '~/utils/useAllQueriesFinished';
import { addError } from '~/widgets/error/error-slice';

function HomePage() {
    const dispatch = useAppDispatch();
    const navTree = useGetNavTreeQuery();
    const slider = useGetRecipesQuery(SLIDER_PARAMS);
    const popular = useGetRecipesQuery(POPULAR_MAIN_PARAMS);

    const { subCategories } = useAppSelector(selectCategoriesWithSubs);
    const hasSubCategories = subCategories.length > 0;
    const randomSubCategoryId = useMemo(() => {
        if (!hasSubCategories) return null;
        return getRandomSubCategoryId(subCategories);
    }, [hasSubCategories, subCategories]);
    const about = useGetRecipesBySubcategoryIdQuery(
        randomSubCategoryId ? { id: randomSubCategoryId, ...ABOUT_PARAMS } : skipToken,
    );
    const isAllLoaded = useAllQueriesFinished([navTree, slider, popular, about]);

    const { isFilter, isLoadingQuery } = useAppSelector(selectRecipeFilter);

    useEffect(() => {
        if (!isAllLoaded) return;
        const errors = [navTree, slider, popular, about]
            .filter((item) => item.isError)
            .map((item) => item.error as CustomErrorResponse);

        if (errors.length > 0) {
            errors.forEach((err) => {
                dispatch(
                    addError({
                        title: err.title,
                        description: ErrorDescEnum.SEARCH,
                    }),
                );
            });
        }
    }, [isAllLoaded, navTree, slider, popular, about]);
    if (!isAllLoaded) {
        return <LoaderScreen />;
    }

    return (
        <ContainerBoxLayout>
            <Flex direction='column' alignItems='center'>
                <CategoryTopFilter title='Приятного аппетита!' />
            </Flex>
            {isLoadingQuery || !isFilter ? (
                <>
                    <WithLoadingError
                        isLoading={slider.isLoading}
                        isError={slider.isError}
                        isExist={!!slider.data?.data.length}
                    >
                        <NewRecipeSlider />
                    </WithLoadingError>
                    <WithLoadingError
                        isLoading={popular.isLoading}
                        isError={popular.isError}
                        isExist={!!popular.data?.data.length}
                    >
                        <SectionTheMost items={popular.data?.data || []} />
                    </WithLoadingError>

                    <SectionBlog />

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
                </>
            ) : (
                <CardListWithFilter mb={{ base: 4, lg: 8 }} />
            )}
        </ContainerBoxLayout>
    );
}

export default HomePage;
