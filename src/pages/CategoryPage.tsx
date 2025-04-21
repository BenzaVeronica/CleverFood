import {
    Box,
    Button,
    Flex,
    GridItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import { desert } from '~/components/SectionAbout/recipes.constants';
import { masDishCategories } from '~/store/category/category.constants';
import { MAS_RECIPES } from '~/store/recipe/recipe.constants';
import { selectFilteredRecipes } from '~/store/recipe/recipe-filter-selector';

function CategoryPage() {
    const { categoryId, subcategoryId } = useParams();
    const currentCategory = masDishCategories.find((cat) => cat.url === categoryId);
    // console.log(subcategoryId);

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    // console.log(activeTabIndex);

    const navigate = useNavigate();
    const handleTabChange = (tabIndex: number) => {
        const selectedSubcategory = currentCategory?.subcategories[tabIndex];
        if (selectedSubcategory) {
            navigate(`${selectedSubcategory.url}`);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentCategory) {
            const activeTabIndex =
                currentCategory?.subcategories.findIndex((el) => el.url === subcategoryId) || 0;
            setActiveTabIndex(activeTabIndex);
            // console.log(activeTabIndex);
        }
    }, [currentCategory, subcategoryId]);

    const { isFilter, filteredList } = useSelector(selectFilteredRecipes);
    return (
        <ContainerGridLayout>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <Flex direction='column' alignItems='center'>
                    {currentCategory && (
                        <CategoryTopFilter
                            title={currentCategory.title}
                            text={currentCategory.text}
                        />
                    )}
                </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                {isFilter && <CardList list={filteredList} mb={{ base: 4, lg: 8 }} />}
                {!isFilter && (
                    <Tabs
                        // mt={4}
                        isLazy
                        index={activeTabIndex}
                        defaultIndex={activeTabIndex}
                        onChange={(index) => handleTabChange(index)}
                        // border={'none'}
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
                                {currentCategory?.subcategories.map((el, index) => (
                                    // console.log(el.id);

                                    <Tab
                                        data-test-id={`tab-${el.url}-${index}`}
                                        key={`CategoryPage_Tab_${el.id}`}
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
                            {currentCategory?.subcategories.map((el, _index) => (
                                <TabPanel
                                    pt={3}
                                    pb={0}
                                    px={0}
                                    key={`CategoryPage_TabPanel_${el.id}`}
                                >
                                    <CardList
                                        item={el}
                                        list={
                                            MAS_RECIPES.filter((recipe) => {
                                                if (!categoryId) return false;
                                                const categoryIndex = recipe.category.findIndex(
                                                    (cat) => cat === categoryId,
                                                );
                                                if (categoryIndex === -1) return false;

                                                return (
                                                    recipe.subcategory[categoryIndex] ===
                                                    subcategoryId
                                                );
                                            }) || []
                                        }
                                    />
                                    <Button
                                        display='block'
                                        mx='auto'
                                        mt={4}
                                        bg='lime.300'
                                        _hover={{
                                            bg: 'lime.500',
                                            color: 'white',
                                            '& path': {
                                                fill: 'white',
                                            },
                                        }}
                                        fontSize='lg'
                                        fontWeight='semibold'
                                    >
                                        Загрузить еще
                                    </Button>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                )}
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <SectionAbout item={desert} />
            </GridItem>
        </ContainerGridLayout>
    );
}

export default CategoryPage;
