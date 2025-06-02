import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeFilter } from '~/store/recipe-filter/recipe-filter-selector';

import {
    removeAllergen,
    removeAuthor,
    removeCategory,
    removeMeatType,
    removeSideDish,
} from '../../store/recipe-filter/recipe-filter-slice';
import SelectedTags from './SelectedTags';

const SelectedTagsFromStore = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectRecipeFilter);

    const selectedValuesMap = {
        categories: filters.categories,
        author: filters.author,
        meatTypes: filters.meatTypes,
        sideDishes: filters.sideDishes,
        allergens: filters.allergens,
    };
    const removeHandlers = {
        categories: (value: string) => dispatch(removeCategory(value)),
        author: (value: string) => dispatch(removeAuthor(value)),
        allergens: (value: string) => dispatch(removeAllergen(value)),
        meatTypes: (value: string) => dispatch(removeMeatType(value)),
        sideDishes: (value: string) => dispatch(removeSideDish(value)),
    };
    return (
        <SelectedTags
            selectedValuesMap={selectedValuesMap}
            removeHandlers={removeHandlers}
            isFromTopFilterBox
        />
    );
};
export default SelectedTagsFromStore;
