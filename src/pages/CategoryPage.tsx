import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import { desert } from '~/components/SectionAbout/recipes.constants';
import { masDishCategories, masItems } from '~/store/recipe/recipe.constants';

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
        }
    }, [currentCategory, subcategoryId]);

    return (
        <Grid
            templateColumns={{
                base: 'repeat(4, 1fr)',
                md: 'repeat(12, 1fr)',
            }}
            ml={{ base: 4, md: 5, lg: 6 }}
            mr={{ base: 4, md: 5, lg: '72px' }}
            gap={{ base: 4, lg: 4, xl: 6 }}
        >
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
                <Tabs
                    // mt={4}
                    isLazy
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
                            overflowY='hidden'
                            pb={0}
                            whiteSpace='nowrap'
                            border='none'
                        >
                            {currentCategory?.subcategories.map((el, _index) => (
                                // console.log(el.id);

                                <Tab
                                    key={`CategoryPage_Tab_${el.id}`}
                                    color='lime.800'
                                    borderColor='blackAlpha.200'
                                    borderBottomWidth='1px'
                                    marginBottom='1px'
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
                            <TabPanel pt={3} pb={0} px={0} key={`CategoryPage_TabPanel_${el.id}`}>
                                <CardList item={el} list={masItems.slice(7)} />
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
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <SectionAbout item={desert} />
            </GridItem>
        </Grid>
    );
}

export default CategoryPage;
