import { Flex, FormLabel, Text, VStack } from '@chakra-ui/react';

import { RecipeIngredients } from '~/store/recipe-filter/recipe.types';

import { Nullable, onChangeIndexIngredient } from '../../../store/recipe-form/recipe-form-types';
import { FormRecipeIngredientItem } from './FormRecipeIngredientItem';

type Props = {
    ingredients: Nullable<RecipeIngredients>[];
    setIngredients: (list: Nullable<RecipeIngredients>[]) => void;
    errors: Record<string, string>;
};

const initIngredient: Nullable<RecipeIngredients> = {
    title: '',
    count: null,
    measureUnit: '',
};

export const FormRecipeIngredientsList = ({ ingredients, setIngredients, errors }: Props) => {
    const handleIngredientChange: onChangeIndexIngredient = (index, field, value) => {
        const updated = [...ingredients];
        updated[index] = { ...updated[index], [field]: value };
        setIngredients(updated);
    };

    const handleRemove = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };
    const handleAdd = () => {
        setIngredients([...ingredients, { ...initIngredient }]);
    };

    return (
        <VStack spacing={4} align='stretch' w='full'>
            <FormLabel variant='main' w='full' mr={0}>
                Добавьте ингредиенты рецепта
            </FormLabel>

            <Flex
                color='lime.600'
                fontWeight='700'
                fontSize='xs'
                w='full'
                display={{ base: 'none', md: 'flex' }}
            >
                <Text w='full' flex='1' px='24px'>
                    Название
                </Text>

                <Text w='125px' textAlign='center'>
                    Количество
                </Text>

                <Text w='310px' px='17px'>
                    Единица измерения
                </Text>
            </Flex>
            {ingredients.map((ingredient, index) => (
                <FormRecipeIngredientItem
                    key={`ingredient-${index}`}
                    index={index}
                    ingredient={ingredient}
                    errors={errors}
                    onRemove={() => handleRemove(index)}
                    onChangeIngredient={(field, value) =>
                        handleIngredientChange(index, field, value)
                    }
                    handleAdd={handleAdd}
                    isNew={index + 1 === ingredients.length}
                />
            ))}
        </VStack>
    );
};
