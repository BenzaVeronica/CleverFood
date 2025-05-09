import { Stack } from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

import { useDrawers } from '~/context/DrawerContext';

import AlergenSwitch from '../AlergenSwitch';
import Checkboxes from '../UI/Checkboxes';
import CustomMultiSelect from '../UI/CustomMultiSelect/CustomMultiSelect';
import { useFilterConfig } from './DrawerFilter.config';
import {
    filterAlergens,
    filterAuthor,
    filterMeatTypes,
    filterSideDish,
} from './DrawerFilter.constants';
import { FormValues } from './DrawerFilterForm';

type Props = {
    control: Control<FormValues>;
};

function DrawerFilterFields({ control }: Props) {
    const { formDrawer } = useDrawers();
    const filterConfig = useFilterConfig();

    return (
        <Stack spacing={{ base: 4, lg: 6 }}>
            <Controller
                control={control}
                name='categories'
                render={({ field }) => (
                    <CustomMultiSelect
                        dataTestId='filter-menu-button-категория'
                        value={field.value || []}
                        onChange={field.onChange}
                        options={filterConfig.categories}
                        placeholder='Категория'
                    />
                )}
            />
            <Controller
                control={control}
                name='author'
                render={({ field }) => (
                    <CustomMultiSelect
                        value={field.value || []}
                        onChange={field.onChange}
                        options={filterAuthor}
                        placeholder='Поиск по автору'
                    />
                )}
            />
            <Controller
                control={control}
                name='meatTypes'
                render={({ field }) => (
                    <Checkboxes
                        value={field.value || []}
                        onChange={field.onChange}
                        title='Тип мяса:'
                        list={filterMeatTypes}
                    />
                )}
            />
            <Controller
                control={control}
                name='sideDishes'
                render={({ field }) => (
                    <Checkboxes
                        value={field.value || []}
                        onChange={field.onChange}
                        title='Тип гарнира:'
                        list={filterSideDish}
                    />
                )}
            />
            <Stack spacing={2}>
                <Controller
                    control={control}
                    name='allergens'
                    render={({ field }) => (
                        <AlergenSwitch
                            isFilterDataTestId={formDrawer.isOpen}
                            dataTestId='allergens-menu-button-filter'
                            isDrawer
                            w='233px'
                            value={field.value || []}
                            onChangeOption={field.onChange}
                            list={filterAlergens}
                        />
                    )}
                />
            </Stack>
        </Stack>
    );
}

export default DrawerFilterFields;
