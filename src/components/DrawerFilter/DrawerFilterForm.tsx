import { Box, Button } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import SelectedTags from '~/components/SelectedTags';
import { DrawerProps } from '~/context/DrawerContext';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';
import { resetFilters, setAllFilter } from '~/store/recipe-filter/recipe-filter-slice';
import { TEST_ID } from '~/test/test.constant';

import CustomDrawer from '../UI/CustomDrawer';
import { useFilterConfig } from './DrawerFilter.config';
import DrawerFilterFields from './DrawerFilterFields';

export type FormValues = {
    categories: string[];
    author: string[];
    meatTypes: string[];
    sideDishes: string[];
    allergens: string[];
};

const getEmptyFilterValues = (): FormValues => ({
    categories: [],
    author: [],
    meatTypes: [],
    sideDishes: [],
    allergens: [],
});

function DrawerFilterForm(props: DrawerProps) {
    const filters = useAppSelector(selectRecipeFilter);

    const {
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            ...getEmptyFilterValues(),
            ...filters,
        },
    });
    const selectedValuesMap = {
        categories: watch('categories') || [],
        meatTypes: watch('meatTypes') || [],
        sideDishes: watch('sideDishes') || [],
        allergens: watch('allergens') || [],
        author: watch('author') || [],
    };

    const dispatch = useAppDispatch();
    const handleFormSubmit = (data: FormValues) => {
        props.onClose();
        dispatch(setAllFilter(data));
    };
    const handleClear = () => {
        reset(getEmptyFilterValues());
        dispatch(resetFilters());
    };

    const filterConfig = useFilterConfig();
    const createRemoveHandlers = () => {
        const handlers: Partial<Record<keyof FormValues, (labelToRemove: string) => void>> = {};
        (Object.keys(filterConfig) as Array<keyof FormValues>).forEach((type) => {
            handlers[type] = (labelToRemove: string) => {
                const valueToRemove = filterConfig[type].find(
                    (option) => option.label === labelToRemove,
                )?.id;

                if (valueToRemove) {
                    setValue(
                        type,
                        watch(type)?.filter((value) => value !== valueToRemove),
                    );
                }
            };
        });

        return handlers;
    };
    const removeHandlers = useMemo(() => createRemoveHandlers(), [filterConfig, setValue, watch]);
    return (
        <CustomDrawer
            dataTestId={TEST_ID.Drawer.Filter}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title='Фильтр'
            footerContent={
                <>
                    <SelectedTags
                        selectedValuesMap={selectedValuesMap}
                        removeHandlers={removeHandlers}
                    />
                    <Box alignSelf='end'>
                        <Button
                            data-test-id='clear-filter-button'
                            size={{ base: 'sm', lg: 'lg' }}
                            variant='outline'
                            colorScheme='black'
                            onClick={handleClear}
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            data-test-id='find-recipe-button'
                            size={{ base: 'sm', lg: 'lg' }}
                            colorScheme='black'
                            ml={2}
                            type='submit'
                            isDisabled={!isDirty}
                            pointerEvents={!isDirty ? 'none' : 'auto'}
                            form='filter-form'
                        >
                            Найти рецепт
                        </Button>
                    </Box>
                </>
            }
        >
            <form id='filter-form' onSubmit={handleSubmit(handleFormSubmit)}>
                <DrawerFilterFields control={control} />
            </form>
        </CustomDrawer>
    );
}

export default DrawerFilterForm;
