import {
    CloseButton,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { KeyboardEvent, useState } from 'react';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import { useAppSelector } from '~/store/hooks';
import { selectAllergens, selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';

import IconSearch from '../../assets/IconSearch.svg?react';

type Props = {
    onBlur: () => void;
    onFocus: () => void;
    onSubmit: (inputValue: string) => void;
    onClear: () => void;
    initValue?: string;
};
export function SearchBox(props: Props) {
    const [inputValue, setInputValue] = useState(props.initValue || '');
    const allergens = useAppSelector(selectAllergens);
    const isSearchDisabled = inputValue.length < 3 && allergens.length === 0;

    const handleSearch = () => {
        if (!isSearchDisabled) {
            props.onSubmit(inputValue);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !isSearchDisabled) {
            props.onSubmit(inputValue);
        }
        if (e.key === 'Escape') {
            handleClear();
        }
    };

    const handleClear = () => {
        setInputValue('');
        props.onClear();
    };

    const { isFilter, isExistResult } = useAppSelector(selectRecipeFilter);

    return (
        <InputGroup>
            <Input
                data-test-id='search-input'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                size={{ base: 'sm', lg: 'lg' }}
                placeholder='Название или ингредиент...'
                _placeholder={{
                    color: 'lime.800',
                }}
                _focus={{
                    borderColor: 'black',
                    boxShadow: `0 0 0 1px black`,
                }}
                borderColor={isFilter ? (isExistResult ? 'green.500' : 'red.500') : 'gray.200'}
            />
            <InputRightElement w={{ base: '64px', lg: '76px' }} h={{ base: 8, lg: 12 }}>
                <CloseButton
                    size='sm'
                    onClick={handleClear}
                    mr={1}
                    aria-label={ACCESSIBILITY.controls.search_clear}
                />
                <IconButton
                    data-test-id='search-button'
                    aria-label={ACCESSIBILITY.controls.search}
                    bg='transparent'
                    icon={
                        <Icon
                            as={IconSearch}
                            boxSize={{ base: '14px', lg: '18px' }}
                            color={isSearchDisabled ? 'gray' : 'black'}
                        />
                    }
                    size={{ base: 'sm', lg: 'lg' }}
                    onClick={handleSearch}
                    pointerEvents={isSearchDisabled ? 'none' : 'auto'}
                />
            </InputRightElement>
        </InputGroup>
    );
}
