import { Box, Button, Grid, GridProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BloggerDraft } from '~/query/blogs/blogs.type';
import { Recipe, RecipeConfigBtnCard } from '~/store/recipe-filter/recipe.types';
import { isBloggerDraft } from '~/store/recipe-filter/recipe.utils';

import { CardHorizontal } from '../Card/CardHorizontal';

type Props = {
    allRecipes: (Recipe | BloggerDraft)[];
    dataTestId?: string;
    dataTestIdGrid?: string;
    itemPerPage?: number;
    config?: RecipeConfigBtnCard;
    withRecommend?: boolean;
    withButton?: boolean;
    isLoading?: boolean;
} & GridProps;

export function CardMixedListPaginated({
    allRecipes,
    dataTestId,
    dataTestIdGrid,
    itemPerPage = 8,
    config,
    withRecommend,
    withButton = true,
    isLoading = false,
    ...gridProps
}: Props) {
    const [visibleCount, setVisibleCount] = useState(itemPerPage);
    const [visibleRecipes, setVisibleRecipes] = useState<(Recipe | BloggerDraft)[]>([]);

    useEffect(() => {
        setVisibleRecipes(allRecipes.slice(0, visibleCount));
    }, [allRecipes, visibleCount]);

    const isEnd = visibleCount >= allRecipes.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + itemPerPage);
    };

    return (
        <>
            <Grid
                data-test-id={dataTestIdGrid}
                rowGap={4}
                columnGap={6}
                templateColumns={{
                    base: 'repeat(4, 1fr)',
                    md: 'repeat(12, 1fr)',
                }}
                {...gridProps}
            >
                {visibleRecipes.map((el, index) => {
                    const isDraft = isBloggerDraft(el);
                    return (
                        <CardHorizontal
                            key={`CardList_CardHorizontal_${el._id}_${el.title}`}
                            el={el as Recipe}
                            index={index}
                            colSpan={{ base: 4, md: 6, lg: 12, xl: 6 }}
                            withRecommend={withRecommend}
                            config={{
                                ...config,
                                editdraft: isDraft,
                                edit: !isDraft,
                            }}
                            isDraft={isDraft}
                        />
                    );
                })}
            </Grid>
            {!!visibleRecipes.length && withButton && !isEnd && (
                <Box w='full' mb={10}>
                    <Button
                        data-test-id={dataTestId}
                        onClick={handleLoadMore}
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
                        isDisabled={isLoading}
                    >
                        {isLoading ? 'Загрузка...' : 'загрузить ещё'}
                    </Button>
                </Box>
            )}
        </>
    );
}
