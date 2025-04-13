import { Box, Flex } from '@chakra-ui/react';

import CategoryTopFilter from '~/components/CategoryTopFilter';
import NewRecipeSlider from '~/components/NewRecipeSlider';
import SectionAbout from '~/components/SectionAbout';
import { vegan } from '~/components/SectionAbout/recipes.constants';
import SectionBlog from '~/components/SectionBlog';
import SectionTheMost from '~/components/SectionTheMost';

function HomePage() {
    return (
        <Box ml={{ base: 4, md: 5, lg: 6 }} mr={{ base: 4, md: 5, lg: '72px' }}>
            <Flex direction='column' alignItems='center'>
                <CategoryTopFilter title='Приятного аппетита!' />
            </Flex>
            <NewRecipeSlider />
            <SectionTheMost />
            <SectionBlog />
            <SectionAbout item={vegan} />
        </Box>
    );
}

export default HomePage;
