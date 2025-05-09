import { Box, Flex, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import CardListPaginated from '~/components/CardList/CardListPaginated';
import CardListWithFilter from '~/components/CardList/CardListWithFilter';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import LoaderScreen from '~/components/UI/Loader/LoaderScreen';
import WithLoadingError from '~/components/WithLoadingError';
import { useGetNavTreeQuery } from '~/query/category/category.api';
import useCurrentCategories, {
    getRandomSubCategoryIdByCategory,
} from '~/query/category/category.utils';
import { useGetRecipesBySubcategoryIdQuery } from '~/query/recipe/recipe.api';
import { ABOUT_PARAMS, RECEPIES_PARAMS } from '~/query/recipe/recipe.constants';
import { CustomErrorResponse } from '~/query/types';
import { useValidateDataOrRedirect } from '~/routes/useValidateDataOrRedirect';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe/recipe-filter-selector';
import { useAllQueriesFinished } from '~/utils/useAllQueriesFinished';
import { addError } from '~/widgets/error/error-slice';

function CategoryPage() {
    const navigate = useNavigate();
    useValidateDataOrRedirect();
    const dispatch = useAppDispatch();
    const { categoryId, subcategoryId } = useParams();
    const navTree = useGetNavTreeQuery();

    const { categories } = useAppSelector(selectCategoriesWithSubs);
    const hasCategories = categories.length > 0;
    const randomSubCategoryId = useMemo(() => {
        if (!hasCategories || !categoryId) return null;
        return getRandomSubCategoryIdByCategory({ categories, categoryId });
    }, [hasCategories, categories, categoryId]);

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const handleTabChange = (tabIndex: number) => {
        const selectedSubcategory = currentCategory?.subCategories[tabIndex];
        if (selectedSubcategory) {
            navigate(`${selectedSubcategory.category}`);
        }
    };

    const about = useGetRecipesBySubcategoryIdQuery(
        randomSubCategoryId ? { id: randomSubCategoryId, ...ABOUT_PARAMS } : skipToken,
    );
    const isAllLoaded = useAllQueriesFinished([navTree, about]);

    const { currentCategory, currentSubcategory } = useCurrentCategories();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentCategory) {
            const activeTabIndex =
                currentCategory?.subCategories.findIndex((el) => el.category === subcategoryId) ||
                0;
            setActiveTabIndex(activeTabIndex);
        }
    }, [currentCategory, subcategoryId]);

    const { isFilter } = useAppSelector(selectRecipeFilter);
    const recepies = useGetRecipesBySubcategoryIdQuery(
        currentSubcategory && !isFilter
            ? { id: currentSubcategory?._id, ...RECEPIES_PARAMS }
            : skipToken,
    );
    // const recepies =
    //     !isFilter && currentSubcategory
    //         ? useGetRecipesBySubcategoryIdQuery({ id: currentSubcategory._id, ...RECEPIES_PARAMS })
    //         : null;

    useEffect(() => {
        if (!isAllLoaded) return;
        const errors = [navTree, about, recepies]
            .filter((item) => item?.isError)
            .map((item) => item?.error as CustomErrorResponse);

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
    }, [isAllLoaded, navTree, about, recepies]);

    if (!isAllLoaded) {
        return <LoaderScreen />;
    }

    return (
        <ContainerGridLayout>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <Flex direction='column' alignItems='center'>
                    {currentCategory && (
                        <CategoryTopFilter
                            title={currentCategory.title}
                            text={currentCategory.description}
                        />
                    )}
                </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                {!isFilter ? (
                    <Tabs
                        isLazy
                        index={activeTabIndex}
                        defaultIndex={activeTabIndex}
                        onChange={(index) => handleTabChange(index)}
                    >
                        <Box
                            overflowX='auto'
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '0',
                                },
                            }}
                        >
                            <TabList
                                width='fit-content'
                                margin='0 auto'
                                flexWrap={{ base: 'nowrap', lg: 'wrap' }}
                                justifyContent='center'
                                overflowY='hidden'
                                pb={0}
                                whiteSpace='nowrap'
                                border='none'
                            >
                                {currentCategory?.subCategories.map((el, index) => (
                                    <Tab
                                        data-test-id={`tab-${el.category}-${index}`}
                                        key={`CategoryPage_Tab_${el._id}`}
                                        color='lime.800'
                                        borderColor='blackAlpha.200'
                                        borderBottomWidth='1px'
                                        marginBottom='1px'
                                        aria-selected={activeTabIndex === index}
                                        _selected={{
                                            color: 'lime.600',
                                            borderColor: 'lime.600',
                                            // marginBottom: '-2px',
                                            marginBottom: '0',
                                            borderBottomWidth: '2px',
                                        }}
                                    >
                                        {el.title}
                                    </Tab>
                                ))}
                            </TabList>
                        </Box>
                        <TabPanels>
                            {currentCategory?.subCategories.map((el, _index) => (
                                <TabPanel
                                    pt={3}
                                    pb={0}
                                    px={0}
                                    key={`CategoryPage_TabPanel_${el._id}`}
                                >
                                    {currentSubcategory && (
                                        <CardListPaginated
                                            queryHook={useGetRecipesBySubcategoryIdQuery}
                                            queryParams={{
                                                id: currentSubcategory._id,
                                                ...RECEPIES_PARAMS,
                                            }}
                                        />
                                    )}
                                    {/* <CardList list={recepies?.data?.data || []} /> */}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                ) : (
                    <CardListWithFilter mb={{ base: 4, lg: 8 }} />
                )}
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
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
            </GridItem>
        </ContainerGridLayout>
    );
}

export default CategoryPage;
