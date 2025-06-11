import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useCategoryBySubCategoryId } from '~/query/category/category.utils';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import useBreakpoints from '~/utils/useBreakpoints';

import CardStat from '../CardStat';
import CategoriesTags from '../CategoriesTags';
import { CustomImage } from '../UI/CustomImage/CustomImage';

type Props = {
    el: Recipe;
};

function CardVertical({ el }: Props) {
    const { isTablet } = useBreakpoints();

    const firstSubCategoryId = el.categoriesIds[0];
    const categs = useCategoryBySubCategoryId(firstSubCategoryId);
    return (
        <Flex
            h={{ base: '222px', lg: '474px' }}
            layerStyle='card'
            width={{ base: '156px', lg: '278px', xl: '322px' }}
            flexShrink={0}
            display='flex'
            flexDirection='column'
            as={Link}
            to={`/${categs?.category?.category}/${categs?.subCategory?.category}/${el._id}`}
        >
            <Box
                width='100%'
                flexShrink={0}
                position='relative'
                overflow='hidden'
                h={{ base: '128px', lg: '230px' }}
            >
                <CategoriesTags
                    subCategoriesIds={el.categoriesIds}
                    keyId='CardVertical'
                    isPosition
                />
                <CustomImage
                    src={el.image}
                    alt={el.title}
                    width='100%'
                    height='100%'
                    objectFit='cover'
                />
            </Box>
            <Flex
                py={{ base: 2, lg: 4 }}
                px={{ base: 2, lg: 6 }}
                flex='1'
                justifyContent='space-between'
                flexDirection='column'
            >
                <Box>
                    <Text
                        fontSize={{ base: 'md', lg: 'lg', xl: 'xl' }}
                        fontWeight={500}
                        isTruncated
                        whiteSpace={{ base: 'normal!important', md: 'normal', lg: 'nowrap' }}
                        noOfLines={{ base: 2, lg: 1 }}
                    >
                        {el.title}
                    </Text>
                    <Text
                        userSelect='auto'
                        pt={1}
                        fontSize='sm'
                        hidden={isTablet}
                        noOfLines={{ base: undefined, md: 3 }}
                    >
                        {el.description}
                    </Text>
                </Box>

                <Flex justifyContent='space-between' mt={{ base: 1, lg: 6 }} gap={1}>
                    <CategoriesTags subCategoriesIds={el.categoriesIds} keyId='CardVertical1' />
                    <CardStat bookmarks={el.bookmarks} like={el.likes} />
                </Flex>
            </Flex>
        </Flex>
    );
}

export default CardVertical;
