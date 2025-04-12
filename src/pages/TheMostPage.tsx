// import { Button, Flex, Icon, Text } from '@chakra-ui/react';
// import ArrowLongRight from '../assets/iconArrowLongRight.svg?react';

import { Grid, GridItem } from '@chakra-ui/react';

import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import { vegan } from '~/components/SectionAbout/recipes.constants';
import { masItems } from '~/store/recipe/recipe.constants';

function TheMostPage() {
    return (
        <div>
            <Grid
                templateColumns='repeat(12, 1fr)'
                ml={{ base: 4, md: 5, lg: 6 }}
                mr={{ base: 4, md: 5, lg: '72px' }}
            >
                <GridItem colStart={3} colSpan={8}>
                    <CategoryTopFilter title='Самое сочное' />
                </GridItem>
            </Grid>
            <CardList
                item={{
                    id: 1,
                    title: 'Самое сочное',
                    url: 'the-most',
                }}
                list={masItems.slice(2, 7)}
            />
            <SectionAbout item={vegan} />
        </div>
    );
}

export default TheMostPage;
