import { Flex, FormControl, IconButton, Input } from '@chakra-ui/react';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import { IconTrash } from '~/components/Icons/Trash';
import { useGetAllMeasureUnitsQuery } from '~/query/measureUnits/measureUnits.api';
import { RecipeIngredients } from '~/store/recipe-filter/recipe.types';
import { TEST_ID } from '~/test/test.constant';
import { HEIGHT_HEADER } from '~/theme/ui.constants';

import { Nullable, onChangeNewIngredient } from '../../../store/recipe-form/recipe-form-types';
import { IconPlus } from '../../Icons/IconPlus';
import CustomSelect from '../../UI/CustomSelect';

type Props = {
    index: number;
    ingredient: Nullable<RecipeIngredients>;
    onRemove: () => void;
    errors: Record<string, string>;
    onChangeIngredient: onChangeNewIngredient;
    handleAdd: () => void;
    isNew?: boolean;
};
export const FormRecipeIngredientItem = ({
    index,
    ingredient,
    errors,
    onRemove,
    isNew = false,
    onChangeIngredient,
    handleAdd,
}: Props) => {
    const { data: measureUnits = [] } = useGetAllMeasureUnitsQuery();
    return (
        <Flex key={index} gap={3} alignItems='flex-end' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
            <FormControl w='full' isInvalid={!!errors?.[`ingredients[${index}].title`]}>
                <Input
                    data-test-id={`recipe-ingredients-title-${index}`}
                    variant='gray'
                    placeholder='Ингредиент'
                    value={ingredient.title || ''}
                    onChange={(e) => onChangeIngredient('title', e.target.value)}
                />
            </FormControl>

            <FormControl w='80px'>
                <Input
                    data-test-id={`recipe-ingredients-count-${index}`}
                    variant='gray'
                    w='80px'
                    placeholder='100'
                    type='number'
                    value={ingredient.count || ''}
                    onChange={(e) => onChangeIngredient?.('count', Number(e.target.value) || null)}
                    isInvalid={!!errors?.[`ingredients[${index}].count`]}
                />
            </FormControl>

            <FormControl w={{ base: `calc(100% - ${HEIGHT_HEADER} - 40px - 30px)`, md: 'full' }}>
                <CustomSelect
                    data-test-id={`recipe-ingredients-measureUnit-${index}`}
                    hasError={!!errors?.[`ingredients[${index}].measureUnit`]}
                    value={ingredient.measureUnit || ''}
                    handleChange={(val: string) => onChangeIngredient?.('measureUnit', val)}
                    options={measureUnits}
                    placeholder='Единица измерения'
                />
            </FormControl>

            {!isNew ? (
                <IconButton
                    data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
                    aria-label={ACCESSIBILITY.ingredients.delete}
                    icon={<IconTrash />}
                    onClick={onRemove}
                    variant='ghost'
                />
            ) : (
                <IconButton
                    data-test-id={TEST_ID.Recipe.AddIngredientsButton}
                    aria-label={ACCESSIBILITY.ingredients.add}
                    icon={<IconPlus boxSize={8} />}
                    onClick={handleAdd}
                    variant='ghost'
                />
            )}
        </Flex>
    );
};
