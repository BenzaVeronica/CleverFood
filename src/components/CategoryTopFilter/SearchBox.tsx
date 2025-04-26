import {
    CloseButton,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { KeyboardEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectFilteredRecipes } from '~/store/recipe/recipe-filter-selector';

import IconSearch from '../../assets/IconSearch.svg?react';

type Props = {
    onBlur: () => void;
    onFocus: () => void;
    onSubmit: (inputValue: string) => void;
    onClear: () => void;
    initValue?: string;
};
function SearchBox(props: Props) {
    // const { setSearchQuery, setIsSearchActive } = useSearch();
    const [inputValue, setInputValue] = useState(props.initValue || '');
    const isSearchDisabled = inputValue.length < 3;

    // const location = useLocation();
    // useEffect(() => {
    // setInputValue('');
    // props.onClear();
    // }, [location.pathname]);
    // useEffect(() => {
    //     setInputValue(props.initValue);
    // }, [props.initValue]);

    const handleSearch = () => {
        if (!isSearchDisabled) {
            props.onSubmit(inputValue);
            // dispatch(setSearchQuery(inputValue));
            // dispatch(setSearchActive(true));
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
        // dispatch(setSearchQuery(''));
        // dispatch(setSearchActive(false));
    };

    const { isFilter, filteredList } = useSelector(selectFilteredRecipes);
    const isValidNotEmpty = isFilter && filteredList.length === 0;
    const validColor = isValidNotEmpty ? 'red' : 'black';

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
                    borderColor: validColor,
                    boxShadow: `0 0 0 1px ${validColor}`,
                }}
                borderColor={isFilter ? (isValidNotEmpty ? 'red' : 'lime.600') : 'gray.200'}
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
