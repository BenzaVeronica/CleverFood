import { FormControl, FormLabel, GridItem, Input, Textarea } from '@chakra-ui/react';

import CustomMultiSelect from '~/components/UI/CustomMultiSelect';
import CustomNumberInput from '~/components/UI/CustomNumberInput';
import { selectSubCategoriesOptions } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';
import { RecipeFormDataDraft } from '~/store/recipe-form/recipe-form-types';
import { TEST_ID } from '~/test/test.constant';
export const FormRecipeMainFields = ({
    formData,
    errors,
    handleChange,
}: {
    formData: RecipeFormDataDraft;
    errors: Record<string, string>;
    handleChange: (field: keyof RecipeFormDataDraft, value: unknown) => void;
}) => {
    const subCategories = useAppSelector(selectSubCategoriesOptions);
    console.log(formData?.categoriesIds);

    return (
        <GridItem
            colSpan={{ base: 4, md: 8, lg: 7, xl: 6 }}
            display='flex'
            flexDirection='column'
            gap={4}
        >
            <FormControl display='flex' justifyContent='space-between' alignItems='center'>
                <FormLabel variant='main' mr={4} onClick={(e) => e.preventDefault()}>
                    Выберите не менее 3-х тегов
                </FormLabel>
                <CustomMultiSelect
                    dataTestId={TEST_ID.Recipe.Categories}
                    value={formData?.categoriesIds || []}
                    onChange={(val) => handleChange('categoriesIds', val)}
                    options={subCategories}
                    hasError={!!errors.categoriesIds}
                    buttonProps={{
                        width: { base: '196px', sm: '232px', md: '380px' },
                    }}
                    maxLabelWidth={120}
                />
            </FormControl>
            <FormControl>
                <Input
                    data-test-id={TEST_ID.Recipe.Title}
                    value={formData?.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    size='lg'
                    placeholder='Название рецепта'
                    variant='gray'
                    borderColor='lime.150'
                    isInvalid={!!errors.title}
                />
            </FormControl>
            <FormControl>
                <Textarea
                    data-test-id={TEST_ID.Recipe.Description}
                    value={formData?.description ?? ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder='Краткое описание рецепта'
                    rows={4}
                    bg='white'
                    borderRadius='md'
                    isInvalid={!!errors.description}
                />
            </FormControl>
            <CustomNumberInput
                dataTestId={TEST_ID.Recipe.Portions}
                label='На сколько человек ваш рецепт?'
                value={formData?.portions ?? null}
                onChange={(val) => handleChange('portions', val)}
                isInvalid={!!errors.portions}
            />
            <CustomNumberInput
                dataTestId={TEST_ID.Recipe.Time}
                label='Сколько времени готовить в минутах?'
                value={formData?.time ?? null}
                onChange={(val) => handleChange('time', val)}
                isInvalid={!!errors.time}
                max={10000}
            />
        </GridItem>
    );
};
