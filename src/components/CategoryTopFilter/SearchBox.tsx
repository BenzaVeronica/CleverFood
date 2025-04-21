import {
    CloseButton,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { KeyboardEvent, useState } from 'react';

import { useAppDispatch } from '~/store/hooks';
import { setSearchActive, setSearchQuery } from '~/store/recipe/recipe-filter-slice';

import IconSearch from '../../assets/IconSearch.svg?react';

type Props = {
    onBlur: () => void;
    onFocus: () => void;
};
function SearchBox(props: Props) {
    const dispatch = useAppDispatch();
    // const { setSearchQuery, setIsSearchActive } = useSearch();
    const [inputValue, setInputValue] = useState('');
    const isSearchDisabled = inputValue.length < 3;

    const handleSearch = () => {
        if (!isSearchDisabled) {
            dispatch(setSearchQuery(inputValue));
            dispatch(setSearchActive(true));
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !isSearchDisabled) {
            handleSearch();
        }
        if (e.key === 'Escape') {
            handleClear();
        }
    };

    const handleClear = () => {
        setInputValue('');
        dispatch(setSearchQuery(''));
        dispatch(setSearchActive(false));
    };

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
            />
            <InputRightElement w={{ base: '64px', lg: '76px' }} h={{ base: 8, lg: 12 }}>
                <CloseButton size='sm' onClick={handleClear} mr={1} aria-label='Очистить поиск' />
                <IconButton
                    data-test-id='search-button'
                    aria-label='IconSearch'
                    bg='transparent'
                    icon={
                        <Icon
                            as={IconSearch}
                            boxSize={{ base: '14px', lg: '18px' }}
                            color={isSearchDisabled ? 'gray' : 'black'}
                        />
                    }
                    size={{ base: 'sm', lg: 'lg' }}
                    // isDisabled={isSearchDisabled}
                    onClick={handleSearch}
                    pointerEvents={isSearchDisabled ? 'none' : 'auto'}
                />
            </InputRightElement>
        </InputGroup>
    );
}

export default SearchBox;
