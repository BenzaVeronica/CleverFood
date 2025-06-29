import {
    Avatar,
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

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import { getImagePath } from '~/query/api.constants';
import { useCategoryBySubCategoryId } from '~/query/category/category.utils';
import { useUserByUserId } from '~/query/user/user.utils';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { useAppSelector } from '~/store/hooks';
import { Recipe, RecipeConfigBtnCard } from '~/store/recipe-filter/recipe.types';
import { selectSearch } from '~/store/recipe-filter/recipe-filter-selector';
import { useLikeAndBookmark } from '~/store/recipe-filter/useLikeAndBookmark';
import { TEST_ID } from '~/test/test.constant';
import useBreakpoints from '~/utils/useBreakpoints';

import BookmarkFilled from '../../assets/bookmark-filled-black.svg?react';
import Bookmark from '../../assets/iconSMBookmark.svg?react';
import CardStat from '../CardStat';
import CategoriesTags from '../CategoriesTags';
import { CustomImage } from '../UI/CustomImage/CustomImage';
import CustomTag from '../UI/CustomTag';
import HighlightText from '../UI/HighlightText';
import { useElementHeight } from './useElementHeight';

type Props = {
    el: Recipe;
    index: number;
    colSpan: GridItemProps['colSpan'];
    withRecommend?: boolean;
    config?: RecipeConfigBtnCard;
    isDraft?: boolean;
};
const defaultConfigBtns: RecipeConfigBtnCard = {
    save: true,
    read: true,
};
export function CardHorizontal({
    el,
    index,
    colSpan,
    withRecommend = true,
    config = defaultConfigBtns,
    isDraft,
}: Props) {
    const { isTablet } = useBreakpoints();
    const { isSearchActive, searchQuery } = useAppSelector(selectSearch);
    const firstSubCategoryId = el.categoriesIds?.[0];
    const categs = useCategoryBySubCategoryId(firstSubCategoryId);
    const { toggleBookmark } = useLikeAndBookmark(el._id, el);

    const firstRecommendUser = useUserByUserId(el.recommendedByUserId?.[0] ?? undefined);

    const { ref: rightRef, height: rightHeight } = useElementHeight<HTMLDivElement>();

    const path = `/${categs?.category?.category}/${categs?.subCategory?.category}/${el._id}`;
    const editbtn = config?.edit
        ? { variant: 'btnOutlineBlack', link: `${PageRoutes.RECIPE_EDIT}${path}` }
        : config?.editdraft
          ? { variant: 'btnMain', link: `${PageRoutes.DRAFT_EDIT}/${el._id}` }
          : undefined;

    return (
        <GridItem
            data-test-id={`food-card-${index}`}
            colSpan={colSpan}
            layerStyle='card'
            overflow='hidden'
            display='flex'
            height='fit-content'
        >
            <Box flexShrink={0} overflow='hidden' position='relative'>
                <CustomImage
                    src={el.image}
                    alt={el.title}
                    objectFit='cover'
                    w={{ base: '158px', lg: '345px' }}
                    height='100%'
                    maxH={rightHeight}
                />
                {withRecommend && firstRecommendUser && (
                    <CustomTag
                        position='absolute'
                        left={6}
                        bottom={5}
                        leftElement={
                            <Avatar
                                lineHeight='normal'
                                size='2xs'
                                src={getImagePath(firstRecommendUser.photo)}
                                name={`${firstRecommendUser.firstName} ${firstRecommendUser.lastName}`}
                            />
                        }
                        text={`${firstRecommendUser.firstName} ${firstRecommendUser.lastName} рекомендует`}
                        color='lime.150'
                        display={{ base: 'none', lg: 'inline-flex' }}
                        zIndex={2}
                        py={1}
                        px={2}
                        gap={2}
                        overflow='hidden'
                        whiteSpace='nowrap'
                        w='max-content'
                    />
                )}
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
                ref={rightRef}
            >
                <Flex justifyContent='space-between'>
                    <CategoriesTags
                        subCategoriesIds={el.categoriesIds}
                        keyId='CardHorizontal1'
                        color='lime.50'
                        withLink
                    />
                    <CardStat bookmarks={el.bookmarks} like={el.likes} />
                    {isDraft && <CustomTag color='blackAlpha.100' h='6' text='Черновик' />}
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
                        noOfLines={{ base: undefined, md: 3 }}
                        hidden={isTablet}
                    >
                        {el.description}
                    </Text>
                </Stack>
                <Flex gap={2} justifyContent='flex-end' mt={{ base: 5, lg: 0 }}>
                    {config.save && (
                        <>
                            <Button
                                onClick={toggleBookmark}
                                display={{ base: 'none', lg: 'flex' }}
                                size='sm'
                                variant='btnOutlineBlack'
                                leftIcon={<Icon as={Bookmark} />}
                                aria-label={ACCESSIBILITY.recipe.bookmark}
                            >
                                Сохранить
                            </Button>
                            <IconButton
                                onClick={toggleBookmark}
                                variant='btnOutlineBlack'
                                size='xs'
                                icon={<Icon as={Bookmark} boxSize={3} />}
                                display={{ base: 'flex', lg: 'none' }}
                                aria-label={ACCESSIBILITY.recipe.bookmark}
                            />
                        </>
                    )}
                    {config.read && (
                        <Button
                            data-test-id={`card-link-${index}`}
                            size={{ base: 'xs', lg: 'sm' }}
                            variant='btnMain'
                            as={Link}
                            to={path}
                            aria-label={ACCESSIBILITY.nav.recipe}
                        >
                            Готовить
                        </Button>
                    )}
                    {editbtn && (
                        <Button
                            data-test-id={TEST_ID.sprint7.profileeditbutton}
                            size={{ base: 'xs', lg: 'sm' }}
                            variant={editbtn.variant}
                            as={Link}
                            to={editbtn.link}
                        >
                            Редактировать
                        </Button>
                    )}
                    {config.bookmark && (
                        <Button
                            onClick={toggleBookmark}
                            display={{ base: 'none', lg: 'flex' }}
                            size='sm'
                            variant='btnOutlineBlack'
                            leftIcon={<Icon as={BookmarkFilled} />}
                            aria-label={ACCESSIBILITY.recipe.bookmark}
                        >
                            Убрать из сохранённых
                        </Button>
                    )}
                </Flex>
            </Flex>
        </GridItem>
    );
}
