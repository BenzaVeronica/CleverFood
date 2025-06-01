import { Box, Flex, FormControl, IconButton, Tag, Textarea } from '@chakra-ui/react';

import { IconTrash } from '~/components/Icons/Trash';
import { BASE_IMAGE_URL } from '~/query/api.constants';
import { RecipeStep } from '~/store/recipe-filter/recipe.types';

import { Nullable } from '../../../store/recipe-form/recipe-form-types';
import ImageBox from '../../UI/ImageBox';

type StepItemProps = {
    index: number;
    step: Nullable<RecipeStep> & {
        id?: string;
    };
    onRemove?: () => void;
    errors?: Record<string, string>;
    isNew?: boolean;
    descriptionValue?: string;
    onDescriptionChange?: (index: number, value: string) => void;
    onImageClick?: () => void;
};

export function FormRecipeStepsItem({
    index,
    step,
    onRemove,
    errors,
    isNew = false,
    descriptionValue,
    onDescriptionChange,
    onImageClick,
}: StepItemProps) {
    return (
        <Box borderWidth='1px' borderRadius='lg'>
            <Flex overflow='hidden' flexDirection={{ base: 'column', md: 'row' }}>
                <Box h='160px' w={{ base: '326px', md: '346px' }}>
                    <ImageBox
                        onClick={onImageClick}
                        image={step?.image && BASE_IMAGE_URL + step?.image}
                        dataTestId={`recipe-steps-image-block-${index}`}
                        dataTestIdPreview={`recipe-steps-image-block-${index}-preview-image`}
                    />
                </Box>

                <Flex p={4} flex='1' flexDirection='column' justifyContent='space-between' gap={4}>
                    <Flex w='full' justifyContent='space-between' alignItems='center'>
                        <Tag alignSelf='flex-start' bg='blackAlpha.100'>
                            {isNew ? 'Шаг 1' : `Шаг ${index + 1}`}
                        </Tag>

                        {!isNew && onRemove && index !== 0 && (
                            <IconButton
                                data-test-id={`recipe-steps-remove-button-${index}`}
                                size='xs'
                                aria-label='Удалить шаг'
                                icon={<IconTrash />}
                                onClick={onRemove}
                                variant='ghost'
                                alignSelf='flex-end'
                            />
                        )}
                    </Flex>

                    <FormControl
                        isInvalid={!!errors?.[`steps[${index}].description`]}
                        _invalid={{
                            borderColor: 'red.500',
                            boxShadow: '0 0 0 2px red.500',
                        }}
                    >
                        <Textarea
                            data-test-id={`recipe-steps-description-${index}`}
                            value={descriptionValue || ''}
                            onChange={(e) => onDescriptionChange?.(index, e.target.value)}
                            rows={3}
                            placeholder='Шаг'
                        />
                    </FormControl>
                </Flex>
            </Flex>
        </Box>
    );
}
