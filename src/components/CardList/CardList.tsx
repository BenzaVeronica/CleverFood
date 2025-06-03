import { Button, Grid, GridItem, GridProps } from '@chakra-ui/react';

import { Recipe } from '~/store/recipe-filter/recipe.types';

import CardHorizontal from '../Card/CardHorizontal';
type Props = {
    list: Recipe[];
    dataTestId?: string;
    withButton?: boolean;
    isLoading?: boolean;
    isEnd?: boolean;
    onLoadMore?: () => void;
} & GridProps;

function CardList({
    list,
    dataTestId,
    withButton,
    isLoading = false,
    isEnd = false,
    onLoadMore,
    ...gridProps
}: Props) {
    return (
        <Grid
            rowGap={4}
            columnGap={6}
            templateColumns={{
                base: 'repeat(4, 1fr)',
                md: 'repeat(12, 1fr)',
            }}
            {...gridProps}
        >
            {list.map((el, index) => (
                <CardHorizontal
                    key={`CardList_CardHorizontal_${el._id}_${el.title}`}
                    el={el}
                    index={index}
                    colSpan={{ base: 4, md: 6, lg: 12, xl: 6 }}
                />
            ))}

            {!!list.length && withButton && !isEnd && (
                <GridItem colSpan={{ base: 4, md: 12 }}>
                    <Button
                        data-test-id={dataTestId}
                        onClick={onLoadMore}
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
                        {isLoading ? 'Загрузка...' : 'Загрузить еще'}
                    </Button>
                </GridItem>
            )}
        </Grid>
    );
}

export default CardList;
