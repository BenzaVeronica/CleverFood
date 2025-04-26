import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ContainerBoxLayout } from '~/app/ContainerAppLayout';
import CardList from '~/components/CardList';
import CategoryTopFilter from '~/components/CategoryTopFilter';
import NewRecipeSlider from '~/components/NewRecipeSlider';
import SectionAbout from '~/components/SectionAbout';
import { vegan } from '~/components/SectionAbout/recipes.constants';
import SectionBlog from '~/components/SectionBlog';
import SectionTheMost from '~/components/SectionTheMost';
import { useAppDispatch } from '~/store/hooks';
import { selectFilteredRecipes } from '~/store/recipe/recipe-filter-selector';
import { resetFilters } from '~/store/recipe/recipe-filter-slice';

function HomePage() {
    const { isFilter, filteredList } = useSelector(selectFilteredRecipes);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(resetFilters());
    }, [dispatch]);
    return (
        <ContainerBoxLayout>
            <Flex direction='column' alignItems='center'>
                <CategoryTopFilter title='Приятного аппетита!' />
            </Flex>
            {/* <CustomMultiSelect /> */}
            {isFilter && <CardList list={filteredList} mb={{ base: 4, lg: 8 }} />}
            {/* {searchQuery || filter && <CardList list={MAS_RECIPES.filter(el=>el.title)}/>} */}
            {!isFilter && <NewRecipeSlider />}
            {!isFilter && <SectionTheMost />}
            <SectionBlog />
            <SectionAbout item={vegan} />
        </ContainerBoxLayout>
    );
}

export default HomePage;
