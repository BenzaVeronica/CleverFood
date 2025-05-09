import {
    Box,
    Button,
    Flex,
    GridItem,
    GridItemProps,
    Icon,
    IconButton,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import { useCategoryBySubCategoryId } from '~/query/category/category.utils';
import { useAppSelector } from '~/store/hooks';
import { recipe } from '~/store/recipe/recipe.types';
import { selectSearch } from '~/store/recipe/recipe-filter-selector';
// import { recipeItem } from '~/store/category/category.types';
import useBreakpoints from '~/utils/useBreakpoints';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import CardStat from '../CardStat';
import CategoriesTags from '../CategoriesTags';
import CustomImage from '../UI/CustomImage/CustomImage';
import HighlightText from '../UI/HighlightText';

type Props = {
    el: recipe;
    index: number;
    colSpan: GridItemProps['colSpan'];
};

function CardHorizontal({ el, index, colSpan }: Props) {
    const { isTablet } = useBreakpoints();
    // const { isSearchActive, searchQuery } = useSearch();
    const { isSearchActive, searchQuery } = useAppSelector(selectSearch);
    const firstSubCategoryId = el.categoriesIds[0];
    const categs = useCategoryBySubCategoryId(firstSubCategoryId);

    return (
        <GridItem
            data-test-id={`food-card-${index}`}
            colSpan={colSpan}
            borderColor='blackAlpha.200'
            borderWidth='1px'
            borderRadius='8px'
            overflow='hidden'
            h='100%'
            display='flex'
        >
            <Box
                maxW={{ base: '158px', lg: '345px' }}
                // width="55%"
                flexShrink={0}
                overflow='hidden'
                position='relative'
            >
                <CustomImage
                    src={el.image}
                    alt={el.title}
                    width='100%'
                    height='100%'
                    objectFit='cover'
                />
                {/* TODO: authorId */}
                {/* {el.authorId && (
                    <Tag
                        position='absolute'
                        left={6}
                        bottom={5}
                        leftElement={
                            <Avatar
                                size='2xs'
                                src={el.recommend.img}
                                name={`${el.recommend.name} ${el.recommend.surname}`}
                            />
                        }
                        text={`${el.recommend.name} ${el.recommend.surname}`}
                        color='lime.150'
                        display={{ base: 'none', lg: 'inline-flex' }}
                        zIndex={2}
                        py={1}
                        px={2}
                        gap={2}
                        overflow='hidden'
                        whiteSpace='nowrap'
                        w='max-content'
                        // maxW="100%"
                    />
                )} */}
                <Flex>
                    <CategoriesTags
                        subCategoriesIds={el.categoriesIds}
                        keyId='CardHorizontal'
                        isPosition
                        color='lime.50'
                        withLink
                    />
                </Flex>
            </Box>

            <Flex
                py={{ base: 2, lg: 5 }}
                px={{ base: 2, lg: 6 }}
                direction='column'
                justifyContent='space-between'
                gap={{ base: 0, lg: 6 }}
                flex='1'
            >
                <Flex justifyContent='space-between'>
                    <CategoriesTags
                        subCategoriesIds={el.categoriesIds}
                        keyId='CardHorizontal1'
                        color='lime.50'
                        withLink
                    />
                    <CardStat bookmarks={el.bookmarks} like={el.likes} />
                </Flex>
                <Stack spacing={1}>
                    <Text
                        fontSize={{ base: 'md', lg: 'xl' }}
                        fontWeight={500}
                        noOfLines={{ base: 2, lg: 1 }}
                        h={{ base: 12, lg: 'auto' }}
                    >
                        <HighlightText
                            highlight={isSearchActive ? searchQuery : ''}
                            text={el.title}
                        />
                    </Text>
                    <Text
                        userSelect='auto'
                        fontSize='sm'
                        noOfLines={{ base: undefined, lg: 3 }}
                        hidden={isTablet}
                    >
                        {el.description}
                    </Text>
                </Stack>
                <Flex gap={2} justifyContent='flex-end' mt={{ base: 5, lg: 0 }}>
                    <Button
                        display={{ base: 'none', lg: 'flex' }}
                        size='sm'
                        variant='outline'
                        colorScheme='black'
                        color='blackAlpha.800'
                        leftIcon={<Icon as={Bookmark} />}
                    >
                        Сохранить
                    </Button>
                    <IconButton
                        aria-label='Bookmark'
                        variant='outline'
                        colorScheme='black'
                        color='blackAlpha.800'
                        size='xs'
                        icon={<Icon as={Bookmark} boxSize={3} />}
                        display={{ base: 'flex', lg: 'none' }}
                    />
                    <Button
                        data-test-id={`card-link-${index}`}
                        size={{ base: 'xs', lg: 'sm' }}
                        colorScheme='black'
                        color='white'
                        as={Link}
                        to={`/${categs?.category?.category}/${categs?.subCategory?.category}/${el._id}`}
                    >
                        Готовить
                    </Button>
                </Flex>
            </Flex>
        </GridItem>
    );
}

export default CardHorizontal;
