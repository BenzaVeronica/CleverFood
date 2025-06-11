import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import FillCirclePlus from '~/assets/FillCirclePlus.svg?react';
import { FilterOptionType } from '~/components/DrawerFilter/DrawerFilter.constants';

type Props = {
    selectedOptions: string[];
    options: FilterOptionType[];
    setOptions: React.Dispatch<React.SetStateAction<FilterOptionType[]>>;
    toggleOption: (option: FilterOptionType) => void;
    isFilterDataTestId: boolean;
};

const CustomAddBox = ({
    selectedOptions,
    options,
    setOptions,
    toggleOption,
    isFilterDataTestId,
}: Props) => {
    const [customAllergen, setCustomAllergen] = useState<string>('');

    const handleAddCustom = (): void => {
        if (!customAllergen.trim()) return;

        const newOption: FilterOptionType = {
            id: customAllergen.toLowerCase().replace(/\s+/g, '_'),
            label: customAllergen,
        };

        if (!options.some((opt) => opt.label === newOption.label)) {
            setOptions([...options, newOption]);
        }

        toggleOption(newOption);
        setCustomAllergen('');
    };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 10);
        return () => clearTimeout(timer);
    }, [selectedOptions]);

    return (
        <Box p={2}>
            <InputGroup size='sm'>
                <Input
                    data-test-id={isFilterDataTestId ? 'add-other-allergen' : ''}
                    value={customAllergen}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCustomAllergen(e.target.value);
                    }}
                    color='lime.800'
                    _placeholder={{ color: 'lime.800' }}
                    placeholder='Другой аллерген'
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') {
                            handleAddCustom();
                        }
                    }}
                    ref={inputRef}
                />
                <InputRightElement>
                    <IconButton
                        data-test-id={isFilterDataTestId ? 'add-allergen-button' : ''}
                        aria-label={ACCESSIBILITY.controls.add}
                        bg='white'
                        size='xs'
                        onClick={handleAddCustom}
                        isDisabled={!customAllergen.trim()}
                        icon={<FillCirclePlus />}
                    />
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};

export default CustomAddBox;
