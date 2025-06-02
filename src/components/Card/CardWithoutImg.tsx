import { Box, Flex, GridItem, GridItemProps, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useCategoryBySubCategoryId } from '~/query/category/category.utils';
import { Recipe } from '~/store/recipe-filter/recipe.types';

import CardStat from '../CardStat';
import CategoriesTags from '../CategoriesTags';

type Props = {
    el: Recipe;
    colSpan: GridItemProps['colSpan'];
};

function CardWithoutImg({ el, colSpan }: Props) {
    const firstSubCategoryId = el.categoriesIds?.[0];
    const categs = useCategoryBySubCategoryId(firstSubCategoryId);
    return (
        <GridItem
            colSpan={colSpan}
            borderColor='blackAlpha.200'
            borderWidth='1px'
            borderRadius='8px'
        >
            <Flex>
                <Box
                    py={{ base: 3, lg: 5 }}
                    px={{ base: 3, lg: 6 }}
                    overflow='hidden'
                    as={Link}
                    to={`/${categs?.category?.category}/${categs?.subCategory?.category}/${el._id}`}
                >
                    <Text fontSize='xl' fontWeight={500} isTruncated>
                        {el.title}
                    </Text>
                    <Text fontSize='sm' noOfLines={3} mt={2} mb={6}>
                        {el.description}
                    </Text>

                    <Flex justifyContent='space-between'>
                        <CategoriesTags
                            subCategoriesIds={el.categoriesIds}
                            keyId='CardWithoutImg'
                            color='lime.50'
                        />
                        <CardStat bookmarks={el.bookmarks} like={el.likes} />
                    </Flex>
                </Box>
            </Flex>
        </GridItem>
    );
}

export default CardWithoutImg;
