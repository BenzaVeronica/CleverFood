import { FormControl, FormControlProps, FormLabel, Switch } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectDisabledAllergenSwitch } from '~/store/recipe-filter/recipe-filter-selector';
import { toggleSearchDisabledAllergenSwitch } from '~/store/recipe-filter/recipe-filter-slice';

import { filterAlergens, FilterOptionType } from '../DrawerFilter/DrawerFilter.constants';
import CustomMultiSelectWithAdd from '../UI/CustomMultiSelect/CustomMultiSelectWithAdd';

type Props = {
    value: string[];
    onChangeOption: (value: string[]) => void;
    onAlergenSubmit?: (value: string[]) => void;
    list: FilterOptionType[];
    isDrawer?: boolean;
    text?: string;
    dataTestId?: string;
    isFilterDataTestId: boolean;
} & FormControlProps;

function AlergenSwitch({
    text = 'Исключить аллергены',
    isDrawer = false,
    value = [],
    onChangeOption,
    onAlergenSubmit,
    list,
    dataTestId,
    isFilterDataTestId,
    ...otherProps
}: Props) {
    const isDisabledAllergenSwitch = useAppSelector(selectDisabledAllergenSwitch);
    const dispatch = useAppDispatch();

    const onSwitchChange = () => {
        dispatch(toggleSearchDisabledAllergenSwitch());
    };
    const onSelectChange = (options: string[]) => {
        onChangeOption(options);
        onAlergenSubmit && onAlergenSubmit(options);
    };

    return (
        <>
            <FormControl display='flex' alignItems='center' gap={3} {...otherProps}>
                <FormLabel
                    htmlFor='allergens-alerts'
                    m='0'
                    ml={1}
                    fontSize='md'
                    fontWeight={500}
                    color='black'
                    w='100%'
                >
                    {text}
                </FormLabel>
                <Switch
                    data-test-id={isDrawer ? 'allergens-switcher-filter' : 'allergens-switcher'}
                    id='allergens-alerts'
                    isChecked={!isDisabledAllergenSwitch}
                    onChange={onSwitchChange}
                />
            </FormControl>
            <CustomMultiSelectWithAdd
                isFilterDataTestId={isFilterDataTestId}
                dataTestId={dataTestId && dataTestId}
                value={value || []}
                onChange={onSelectChange}
                options={filterAlergens}
                isDisabled={isDisabledAllergenSwitch}
            />
        </>
    );
}

export default AlergenSwitch;
