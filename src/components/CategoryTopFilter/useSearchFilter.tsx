import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';
import {
    setIsFilter,
    setSearchActive,
    setSearchQuery,
} from '~/store/recipe-filter/recipe-filter-slice';

export function useSearchFilter() {
    const dispatch = useAppDispatch();
    const { isLoadingQuery, isSearchActive } = useAppSelector(selectRecipeFilter);

    const [shadow, setShadow] = useState('none');

    useEffect(() => {
        if (isSearchActive || isLoadingQuery) {
            setShadow('var(--chakra-shadows-xl)');
        } else {
            setShadow('none');
        }
    }, [isSearchActive, isLoadingQuery]);

    const handleFocus = () => dispatch(setSearchActive(true));

    const handleBlur = () => dispatch(setSearchActive(false));

    const handleClear = () => dispatch(setSearchQuery(''));

    const handleSubmit = (inputValue: string) => {
        if (inputValue) {
            dispatch(setSearchQuery(inputValue));
        }
        dispatch(setIsFilter(true));
    };

    return {
        shadow,
        handleFocus,
        handleBlur,
        handleClear,
        handleSubmit,
    };
}
