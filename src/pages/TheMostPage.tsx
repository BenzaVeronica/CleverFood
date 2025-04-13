// import { Button, Flex, Icon, Text } from '@chakra-ui/react';
// import ArrowLongRight from '../assets/iconArrowLongRight.svg?react';

import { Box, Flex } from '@chakra-ui/react';

import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import { vegan } from '~/components/SectionAbout/recipes.constants';
import { masItems } from '~/store/recipe/recipe.constants';

function TheMostPage() {
    return (
        <Box ml={{ base: 4, md: 5, lg: 6 }} mr={{ base: 4, md: 5, lg: '72px' }}>
            <Flex direction='column' alignItems='center'>
                <CategoryTopFilter title='Самое сочное' />
            </Flex>
            <CardList
                item={{
                    id: 1,
                    title: 'Самое сочное',
                    url: 'the-most',
                }}
                list={masItems.slice(2, 7)}
            />
            <SectionAbout item={vegan} />
        </Box>
    );
}

export default TheMostPage;
