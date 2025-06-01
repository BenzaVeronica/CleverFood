import { Button, FormLabel, VStack } from '@chakra-ui/react';

import { RecipeStep } from '~/store/recipe-filter/recipe.types';
import { HandleArrayItemFieldChange, Nullable } from '~/store/recipe-form/recipe-form-types';

import { IconPlus } from '../../Icons/IconPlus';
import { FormRecipeStepsItem } from './FormRecipeStepsItem';

// type StepNullable = {
//     stepNumber: number;
//     description: string | null;
//     image?: string | null;
// };

type Props = {
    steps: Nullable<RecipeStep>[];
    setSteps: (steps: Nullable<RecipeStep>[]) => void;
    errors: Record<string, string>;
    onOpen: () => void;
    setImageFor: (field: string) => void;
    onArrayItemFieldChange: HandleArrayItemFieldChange;
};

export function FormRecipeStepsList({
    steps,
    setSteps,
    errors,
    onOpen,
    setImageFor,
    onArrayItemFieldChange,
}: Props) {
    // const [newStep, setNewStep] = useState<Nullable<RecipeStep>>({
    //     stepNumber: steps.length + 1,
    //     description: null,
    //     image: null,
    // });

    const onChangeNewDescription = (index: number, value: string) => {
        onArrayItemFieldChange('steps', index, 'description', value);
        // setNewStep((prev) => ({ ...prev, description: value }));
    };

    const addStep = () => {
        // if (!newStep.description) return;

        setSteps([
            ...steps,
            {
                stepNumber: steps.length + 1,
                description: null,
                image: null,
            },
        ]);
        // setSteps([
        //     ...steps,
        //     {
        //         stepNumber: newStep.stepNumber,
        //         description: newStep.description,
        //         image: newStep.image,
        //     },
        // ]);
        // setNewStep({
        //     stepNumber: steps.length + 1,
        //     description: null,
        //     image: null,
        // });
    };

    const onRemove = (index: number) => {
        const updated = steps
            .filter((_, i) => i !== index)
            .map((step, idx) => ({
                ...step,
                stepNumber: idx + 1,
            }));
        setSteps(updated);
    };

    const onImageClick = (index: number) => {
        setImageFor(`steps[${index}].image`);
        onOpen();
    };
    return (
        <VStack spacing={4} w='full'>
            <FormLabel variant='main' w='full' m={0}>
                Добавьте шаги приготовления
            </FormLabel>

            <VStack spacing={4} align='stretch' w='full'>
                {steps.map((step, index) => (
                    <FormRecipeStepsItem
                        key={'FormRecipeStepsItem' + step.stepNumber}
                        index={index}
                        step={step}
                        errors={errors}
                        descriptionValue={step.description || ''}
                        onDescriptionChange={onChangeNewDescription}
                        onRemove={() => onRemove(index)}
                        onImageClick={() => onImageClick(index)}
                    />
                ))}

                {/* <FormRecipeStepsItem
                    index={steps.length}
                    step={newStep}
                    isNew
                    descriptionValue={newStep.description || ''}
                    onDescriptionChange={onChangeNewDescription}
                    onImageClick={() => onImageClick(steps.length)}
                /> */}

                <Button
                    rightIcon={<IconPlus color='red' />}
                    variant='btnOutlineBlack'
                    size='sm'
                    onClick={addStep}
                    alignSelf='flex-end'
                    // isDisabled={!newStep.description}
                >
                    Новый шаг
                </Button>
            </VStack>
        </VStack>
    );
}
