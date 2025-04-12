import { Grid, GridProps } from '@chakra-ui/react';

import { dishSubcategory, recipe } from '~/store/recipe/recipe.types';

import CardHorizontal from '../Card/CardHorizontal';

type Props = {
    item: dishSubcategory;
    list: recipe[];
} & GridProps;

function CardList({ item, list, ...gridProps }: Props) {
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
            {list.map((el) => (
                <CardHorizontal
                    el={el}
                    colSpan={{ base: 4, md: 6, lg: 12, xl: 6 }}
                    key={`CardList_CardHorizontal_${el.id}`}
                />
            ))}
        </Grid>
    );
}

export default CardList;
