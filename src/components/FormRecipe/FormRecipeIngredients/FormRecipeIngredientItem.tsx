import { Flex, FormControl, IconButton, Input } from '@chakra-ui/react';

import { IconTrash } from '~/components/Icons/Trash';
import { useGetAllMeasureUnitsQuery } from '~/query/measureUnits/measureUnits.api';
import { RecipeIngredients } from '~/store/recipe-filter/recipe.types';
import { TEST_ID } from '~/test/test.constant';

import { Nullable, onChangeNewIngredient } from '../../../store/recipe-form/recipe-form-types';
import { IconPlus } from '../../Icons/IconPlus';
import CustomSelect from '../../UI/CustomSelect';

type Props = {
    index: number;
    ingredient: Nullable<RecipeIngredients>;
    errors?: Record<string, string>;
    onRemove?: () => void;
    isNew?: boolean;
    onChangeIngredient: onChangeNewIngredient;
    handleAdd: () => void;
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
                    // defaultValue={!isNew ? (ingredient.title ?? '') : undefined}
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
                    // defaultValue={!isNew ? (ingredient.count ?? '') : undefined}
                    isInvalid={!!errors?.[`ingredients[${index}].count`]}
                />
            </FormControl>

            <FormControl w={{ base: 'calc(100% - 80px - 40px - 30px)', md: 'full' }}>
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
                    aria-label='Удалить ингредиент'
                    icon={<IconTrash />}
                    onClick={onRemove}
                    variant='ghost'
                />
            ) : (
                <IconButton
                    data-test-id={TEST_ID.Recipe.AddIngredientsButton}
                    aria-label='Добавить ингредиент'
                    icon={<IconPlus boxSize={8} />}
                    onClick={handleAdd}
                    // onClick={() => onChangeIngredient?.('submit', null)}
                    variant='ghost'
                    // isDisabled={!ingredient.title}
                />
            )}
        </Flex>
    );
};
