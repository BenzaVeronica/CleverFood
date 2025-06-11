import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import { useDrawers } from '~/context/DrawerContext';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectAllergens, selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';
import { setAllergens } from '~/store/recipe-filter/recipe-filter-slice';

import IconFilter from '../../assets/iconfilter.svg?react';
import AlergenSwitch from '../AlergenSwitch';
import DrawerFilterForm from '../DrawerFilter';
import { filterAlergens } from '../DrawerFilter/DrawerFilter.constants';
import SelectedTagsFromStore from '../SelectedTags/SelectedTagsFromStore';
import Loader from '../UI/Loader';
import SearchBox from './SearchBox';
import useSearchFilter from './useSearchFilter';

type Props = {
    title: string;
    text?: string;
};

function CategoryTopFilter({ title, text }: Props) {
    const { categoryId } = useParams();
    const { formDrawer } = useDrawers();

    const dispatch = useAppDispatch();

    const value = useAppSelector(selectAllergens);

    const onAlergenSubmit = (allergens: string[]) => {
        dispatch(setAllergens(allergens));
    };
    const onChangeAlergen = (allergens: string[]) => {
        dispatch(setAllergens(allergens));
    };

    const { shadow, handleFocus, handleBlur, handleClear, handleSubmit } = useSearchFilter();

    const { isLoadingQuery, searchQuery, isExistResult } = useAppSelector(selectRecipeFilter);

    return (
        <Box
            boxShadow={shadow}
            borderRadius='0 0 24px 24px'
            w={{ base: '298px', md: '727px', lg: '898px' }}
            pb={8}
        >
            <Text textAlign='center' textStyle='h1' as='h1' mt={{ base: 4, lg: 8 }}>
                {title}
            </Text>
            {isLoadingQuery ? (
                <Loader dataTestId='loader-search-block' />
            ) : (
                <Box maxW='520px' m='0 auto'>
                    <Text
                        marginX='auto'
                        textAlign='center'
                        textStyle='main'
                        color='blackAlpha.600'
                        as='p'
                        mt={3}
                        noOfLines={4}
                    >
                        {text}
                    </Text>
                    {formDrawer.isOpen && (
                        <DrawerFilterForm isOpen={formDrawer.isOpen} onClose={formDrawer.onClose} />
                    )}
                    <Flex
                        gap={3}
                        mt={{ base: 4, lg: 8 }}
                        marginX='auto'
                        w={{ base: '328px', md: 'auto' }}
                    >
                        <IconButton
                            data-test-id='filter-button'
                            variant='outline'
                            aria-label={ACCESSIBILITY.controls.filter}
                            size={{ base: '32px', lg: '48px' }}
                            p={{ base: 2, lg: '11px' }}
                            icon={<Icon as={IconFilter} boxSize={{ base: '14px', lg: '24px' }} />}
                            onClick={formDrawer.onOpen}
                        />
                        <SearchBox
                            key={categoryId}
                            initValue={searchQuery}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onClear={handleClear}
                            onSubmit={handleSubmit}
                        />
                    </Flex>
                    <Flex
                        mt={4}
                        marginX='auto'
                        gap={4}
                        alignItems='center'
                        display={{ base: 'none', lg: 'flex' }}
                    >
                        <AlergenSwitch
                            isFilterDataTestId={!formDrawer.isOpen}
                            dataTestId='allergens-menu-button'
                            value={value || []}
                            onChangeOption={onChangeAlergen}
                            onAlergenSubmit={onAlergenSubmit}
                            list={filterAlergens}
                        />
                    </Flex>
                    {isExistResult && <SelectedTagsFromStore />}
                </Box>
            )}
        </Box>
    );
}

export default CategoryTopFilter;
