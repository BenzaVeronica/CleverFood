import { Box, Grid, GridItem } from '@chakra-ui/react';

import CategoryTopFilter from '~/components/CategoryTopFilter';
import NewRecipeSlider from '~/components/NewRecipeSlider';
import SectionAbout from '~/components/SectionAbout';
import { vegan } from '~/components/SectionAbout/recipes.constants';
import SectionBlog from '~/components/SectionBlog';
import SectionTheMost from '~/components/SectionTheMost';

function HomePage() {
    return (
        <Box ml={{ base: 4, md: 5, lg: 6 }} mr={{ base: 4, md: 5, lg: '72px' }}>
            <Grid
                templateColumns={{
                    base: 'repeat(4, 1fr)',
                    md: 'repeat(12, 1fr)',
                }}
            >
                <GridItem colStart={{ base: 1, md: 3 }} colSpan={{ base: 4, md: 8 }}>
                    <CategoryTopFilter title='Приятного аппетита!' />
                </GridItem>
            </Grid>
            <NewRecipeSlider />
            <SectionTheMost />
            <SectionBlog />
            <SectionAbout item={vegan} />
        </Box>
    );
}

export default HomePage;
