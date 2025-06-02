import { Box, Button, FormControl, Grid, GridItem, HStack, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Location, useBlocker, useNavigate } from 'react-router';

import { BASE_IMAGE_URL } from '~/query/api.constants';
import { getCategoryBySubCategoryId } from '~/query/category/category.utils';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { isServerError } from '~/query/errors/error.utils';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
} from '~/query/recipe/recipe.api';
import { CustomErrorResponse } from '~/query/types';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectIsDirty } from '~/store/recipe-form/recipe-form-selector';
import { TEST_ID } from '~/test/test.constant';
import { addError, addSuccess } from '~/widgets/error/error-slice';
import ErrorNotification from '~/widgets/error/ErrorNotification';

import {
    baseSchema,
    RecipeFormData,
    RecipeFormDataDraft,
    recipeSchema,
} from '../../store/recipe-form/recipe-form-types';
import { IconPencil } from '../Icons/IconPencil';
import { ModalExitSaveNavBlock } from '../ModalExitSave/ModalExitSaveNavBlock';
import { ModalImageUploader } from '../ModalImageUploader/ModalImageUploader';
import ImageBox from '../UI/ImageBox';
import LoaderScreen from '../UI/Loader/LoaderScreen';
import { FormRecipeIngredientsList } from './FormRecipeIngredients/FormRecipeIngredientsList';
import { FormRecipeMainFields } from './FormRecipeMainFields/FormRecipeMainFields';
import { FormRecipeStepsList } from './FormRecipeSteps/FormRecipeStepsList';
import { useRecipeForm } from './useRecipeForm';

type Props = {
    recipeId?: string;
    initialData?: RecipeFormDataDraft | null;
};
const FormRecipe = ({ initialData, recipeId }: Props) => {
    const dispatch = useAppDispatch();

    const {
        formData,
        errors,
        handleChange,
        handleArrayItemFieldChange,
        validateWithSchema,
        handleImageSuccess,
        resetForm,
    } = useRecipeForm(initialData);

    const [imageFor, setImageFor] = useState<string | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();
    const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
    const [createRecipeDraft, { isLoading: isSavingDraft }] = useCreateRecipeDraftMutation();

    const { categories, subCategories } = useAppSelector(selectCategoriesWithSubs);

    const navigate = useNavigate();
    const isAllowNavigationRef = useRef(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [nextLocation, setNextLocation] = useState<null | Location>(null);
    const isDirty = useAppSelector(selectIsDirty);
    const setIsAllowNavigation = (val: boolean) => (isAllowNavigationRef.current = val);

    const handleConfirmLeave = () => {
        setIsAllowNavigation(true);
        setShowLeaveModal(false);
        if (nextLocation) navigate(nextLocation);
    };

    useBlocker(({ currentLocation, nextLocation }) => {
        if (isAllowNavigationRef.current) return false;
        if (isDirty && currentLocation.pathname !== nextLocation.pathname) {
            setNextLocation(nextLocation);
            setShowLeaveModal(true);
            return true;
        }
        return false;
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateWithSchema(recipeSchema, formData);
        if (!isValid) return;
        if (!recipeId) {
            try {
                const result = await createRecipe(formData as RecipeFormData).unwrap();
                dispatch(addSuccess(TOAST_MESSAGE.RecipeCreate[200]));
                const tree = getCategoryBySubCategoryId({
                    categories,
                    subCategories,
                    subCategoryId: result.categoriesIds[0],
                });
                setIsAllowNavigation(true);
                resetForm();
                navigate(`/${tree?.category.category}/${tree?.subCategory.category}/${result._id}`);
            } catch (error) {
                const err = error as CustomErrorResponse;
                if (err.status === 409 || err.status === 500) {
                    dispatch(addError(TOAST_MESSAGE.RecipeCreate[err.status]));
                }
            }
        } else {
            try {
                await updateRecipe({
                    id: recipeId,
                    data: formData as RecipeFormData,
                }).unwrap();
                resetForm();
                setIsAllowNavigation(true);
                dispatch(addSuccess(TOAST_MESSAGE.RecipeCreate[200]));
                navigate(window.location.pathname.replace(`${PageRoutes.RECIPE_EDIT}`, ''));
            } catch (error) {
                const err = error as CustomErrorResponse;
                if (err.status === 409 || err.status === 500) {
                    dispatch(addError(TOAST_MESSAGE.RecipeCreate[err.status]));
                }
            }
        }
    };

    const onSaveDraft = async () => {
        try {
            const isValid = await validateWithSchema(baseSchema, formData);
            if (!isValid) {
                throw {
                    title: 'Validation failed',
                    message: 'Проверьте правильность заполнения формы',
                };
            }
            await createRecipeDraft(formData).unwrap();
            setIsAllowNavigation(true);
            dispatch(addSuccess(TOAST_MESSAGE.RecipeDraftCreate[200]));
            navigate('/', { state: { showNotification: true } });
            return true;
        } catch (error) {
            setIsAllowNavigation(false);
            const err = error as CustomErrorResponse;
            if (isServerError(err.status)) {
                dispatch(addError(TOAST_MESSAGE.RecipeDraftCreate[500]));
            }
            if (err.status === 409) {
                dispatch(addError(TOAST_MESSAGE.RecipeCreate[err.status]));
            }
            throw error;
        }
    };

    const match = imageFor?.match(/\[(\d+)\]/);
    const index = match ? parseInt(match[1], 10) : null;
    const getCurrentImage = () => {
        if (!imageFor) return undefined;

        if (imageFor === 'image' && formData.image) {
            return BASE_IMAGE_URL + formData.image;
        }

        if (index !== null && formData?.steps && formData?.steps[index].image) {
            return BASE_IMAGE_URL + formData?.steps[index].image;
        }

        return undefined;
    };

    return (
        <>
            {(isCreating || isSavingDraft || isUpdating) && <LoaderScreen />}
            <Box
                as='form'
                onSubmit={onSubmit}
                pt={{ base: 4, lg: 12 }}
                pb={{ base: 4, lg: 8 }}
                data-test-id={TEST_ID.Recipe.Form}
            >
                <ModalImageUploader
                    isOpen={isOpen}
                    onClose={onClose}
                    onSuccess={handleImageSuccess}
                    uploadFor={imageFor}
                    dataTestId={
                        imageFor === 'image'
                            ? TEST_ID.Recipe.ImageBlockInputFile
                            : `recipe-steps-image-block-${index}-input-file`
                    }
                    currentImage={getCurrentImage()}
                />
                <Grid
                    width={{ base: 'calc(100% - 16px)', md: 'auto' }}
                    templateColumns={{
                        base: 'repeat(4, 1fr)',
                        md: 'repeat(12, 1fr)',
                    }}
                    ml={{ base: 4, md: 5, lg: 6 }}
                    mr={{ base: 4, md: 5, lg: 6 }}
                    columnGap={4}
                    rowGap={8}
                >
                    <GridItem colSpan={{ base: 4, md: 4, lg: 5, xl: 6 }}>
                        <FormControl
                            isInvalid={!!errors.image}
                            _invalid={{
                                border: '2px solid',
                                borderColor: 'red.500',
                                borderRadius: 'md',
                            }}
                        >
                            <Box h={{ base: '224px', lg: '410px' }}>
                                <ImageBox
                                    onClick={() => {
                                        setImageFor('image');
                                        onOpen();
                                    }}
                                    image={formData?.image && BASE_IMAGE_URL + formData?.image}
                                    dataTestId={TEST_ID.Recipe.ImageBlock}
                                    dataTestIdPreview={TEST_ID.Recipe.ImageBlockPreviewImage}
                                />
                            </Box>
                        </FormControl>
                    </GridItem>
                    <FormRecipeMainFields
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                    />

                    <GridItem
                        colSpan={{ base: 4, md: 9, xl: 6 }}
                        colStart={{ base: 1, md: 2, lg: 2, xl: 3 }}
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        gap={{ base: 8, lg: 10 }}
                    >
                        <FormRecipeIngredientsList
                            ingredients={formData?.ingredients ?? []}
                            setIngredients={(newList) => handleChange('ingredients', newList)}
                            errors={errors}
                        />
                        <FormRecipeStepsList
                            steps={formData?.steps ?? []}
                            setSteps={(newSteps) => handleChange('steps', newSteps)}
                            errors={errors}
                            onOpen={onOpen}
                            onArrayItemFieldChange={handleArrayItemFieldChange}
                            setImageFor={setImageFor}
                        />

                        <HStack
                            spacing={5}
                            flexDirection={{ base: 'column', md: 'row' }}
                            w={{ base: 'full', md: 'auto' }}
                        >
                            <Button
                                data-test-id={TEST_ID.Recipe.SaveDraftButton}
                                onClick={onSaveDraft}
                                w={{ base: 'full', md: 'auto' }}
                                variant='btnOutlineBlack'
                                leftIcon={<IconPencil fill='black' />}
                            >
                                Сохранить черновик
                            </Button>
                            <Button
                                data-test-id={TEST_ID.Recipe.PublishButton}
                                type='submit'
                                w={{ base: 'full', md: 'auto' }}
                                variant='btnMain'
                            >
                                Опубликовать рецепт
                            </Button>
                        </HStack>
                    </GridItem>
                </Grid>
            </Box>

            <ModalExitSaveNavBlock
                isOpen={showLeaveModal}
                onClose={() => setShowLeaveModal(false)}
                onSaveDraft={onSaveDraft}
                resetForm={resetForm}
                onConfirmNavigation={handleConfirmLeave}
            />
            <ErrorNotification />
        </>
    );
};

export default FormRecipe;
