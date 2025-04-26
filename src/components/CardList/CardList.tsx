import { Grid, GridProps } from '@chakra-ui/react';

import { dishSubcategory } from '~/store/category/category.types';
import { recipe } from '~/store/recipe/recipe.types';

import CardHorizontal from '../Card/CardHorizontal';

type Props = {
    item?: dishSubcategory;
    list: recipe[];
} & GridProps;

function CardList({ item, list, ...gridProps }: Props) {
    // const { searchQuery, category, allergens, meat, side } = useAppSelector(selectActiveFilters);
    // const filters = useAppSelector(selectActiveFilters);

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
                    key={`CardList_CardHorizontal_${el.id}`}
                    el={el}
                    index={index}
                    colSpan={{ base: 4, md: 6, lg: 12, xl: 6 }}
                />
            ))}
        </Grid>
    );
}

export default CardList;
