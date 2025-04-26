import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useDrawers } from '~/context/DrawerContext';
import { useAppDispatch } from '~/store/hooks';
import { setAllergens, setSearchActive, setSearchQuery } from '~/store/recipe/recipe-filter-slice';

import IconFilter from '../../assets/iconfilter.svg?react';
import AlergenSwitch from '../AlergenSwitch';
import DrawerFilterForm from '../DrawerFilter';
import { filterAlergens } from '../DrawerFilter/DrawerFilter.constants';
import SearchBox from './SearchBox';

type Props = {
    title: string;
    text?: string;
    // list: item;
};

function CategoryTopFilter({ title, text }: Props) {
    const { categoryId } = useParams();
    const { formDrawer } = useDrawers();
    const boxRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        if (boxRef.current) {
            boxRef.current.style.boxShadow = 'var(--chakra-shadows-xl)';
        }
    };
    const handleBlur = () => {
        if (boxRef.current) {
            boxRef.current.style.boxShadow = 'none';
        }
    };
    const dispatch = useAppDispatch();
    const handleClear = () => {
        dispatch(setSearchQuery(''));
        dispatch(setSearchActive(false));
    };
    const handleSubmit = (inputValue: string) => {
        dispatch(setSearchQuery(inputValue));
        dispatch(setSearchActive(true));
    };

    const [value, setValue] = useState<string[] | null>(null);
    const onAlergenSubmit = (allergens: string[]) => {
        dispatch(setAllergens(allergens));
    };
    const onChangeAlergen = (allergens: string[]) => {
        setValue(allergens);
    };
    return (
        <Box
            ref={boxRef}
            boxShadow='none'
            // boxShadow='xl'
            borderRadius='0 0 24px 24px'
            w={{ base: '360px', xs: '480px', md: '578px', xl: '898px' }}
            pb={8}
        >
            <Text textAlign='center' textStyle='h1' as='h1' mt={{ base: 4, lg: 8 }}>
                {title}
            </Text>
            <Text
                marginX='auto'
                textAlign='center'
                textStyle='main'
                color='blackAlpha.600'
                as='p'
                mt={3}
                w={{ base: '298px', md: '727px', lg: '898px' }}
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
                maxW='520px'
                marginX='auto'
                w={{ base: '328px', md: 'auto' }}
            >
                <IconButton
                    data-test-id='filter-button'
                    variant='outline'
                    aria-label='Фильтр'
                    // size='lg'
                    // w={{ base: 8, lg: 12 }}
                    // h={{ base: 8, lg: 12 }}
                    // size={{ base: 'sm', lg: "lg" }}
                    size={{ base: '32px', lg: '48px' }}
                    p={{ base: 2, lg: '11px' }}
                    icon={<Icon as={IconFilter} boxSize={{ base: '14px', lg: '24px' }} />}
                    onClick={formDrawer.onOpen}
                />
                <SearchBox
                    key={categoryId}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClear={handleClear}
                    onSubmit={handleSubmit}
                />
            </Flex>
            <Flex
                mt={4}
                maxW='520px'
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
        </Box>
    );
}

export default CategoryTopFilter;
