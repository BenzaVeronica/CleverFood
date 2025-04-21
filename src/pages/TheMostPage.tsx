// import { Button, Flex, Icon, Text } from '@chakra-ui/react';
// import ArrowLongRight from '../assets/iconArrowLongRight.svg?react';

import { Flex } from '@chakra-ui/react';

import { ContainerBoxLayout } from '~/app/ContainerAppLayout';
import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import SectionAbout from '~/components/SectionAbout';
import { vegan } from '~/components/SectionAbout/recipes.constants';
import { MAS_RECIPES } from '~/store/recipe/recipe.constants';
import { sortByField } from '~/store/recipe/utils';

function TheMostPage() {
    const list = sortByField(MAS_RECIPES, 'likes', 'desc').slice(0, 8);
    return (
        <ContainerBoxLayout>
            <Flex direction='column' alignItems='center'>
                <CategoryTopFilter title='Самое сочное' />
            </Flex>
            <CardList
                item={{
                    id: 1,
                    title: 'Самое сочное',
                    url: 'the-most',
                }}
                list={list}
            />
            <SectionAbout item={vegan} />
        </ContainerBoxLayout>
    );
}

export default TheMostPage;
