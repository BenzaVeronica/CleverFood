import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectRecipeEmptyForm } from '~/store/recipe-form/recipe-form-selector';
import { markAsDirty, resetRecipeForm } from '~/store/recipe-form/recipe-form-slice';
import {
    ArrayItemType,
    HandleArrayItemFieldChange,
    RecipeFormDataDraft,
} from '~/store/recipe-form/recipe-form-types';

export const useRecipeForm = (initialData: RecipeFormDataDraft | undefined | null) => {
    const emptyForm = useAppSelector(selectRecipeEmptyForm);

    const [formData, setFormData] = useState<RecipeFormDataDraft>(initialData || emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(emptyForm);
        }
    }, [initialData, emptyForm]);

    const dispatch = useAppDispatch();
    const handleChange = (field: keyof RecipeFormDataDraft, value: unknown) => {
        dispatch(markAsDirty());
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleArrayItemFieldChange: HandleArrayItemFieldChange = (
        arrayField,
        index,
        itemField,
        value,
    ) => {
        const array = [...((formData?.[arrayField] as ArrayItemType[]) || [])];
        if (array[index]) {
            dispatch(markAsDirty());
            array[index] = { ...array[index], [itemField]: value };
            setFormData((prev) => ({ ...prev, [arrayField]: array }));
        }
    };

    const validateWithSchema = async (schema: yup.AnyObjectSchema, data: unknown) => {
        try {
            await schema.validate(data, { abortEarly: false });
            return true;
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                err.inner.forEach((e) => {
                    if (e.path) newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleImageSuccess = (image: string, field: string) => {
        const match = field.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
        if (match) {
            const [, arrayField, indexStr, itemField] = match;
            handleArrayItemFieldChange(
                arrayField as keyof ArrayItemType,
                +indexStr,
                itemField,
                image,
            );
        } else {
            handleChange(field as keyof RecipeFormDataDraft, image);
        }
    };

    const resetForm = () => {
        dispatch(resetRecipeForm());
    };

    return {
        formData,
        errors,
        handleChange,
        handleArrayItemFieldChange,
        validateWithSchema,
        setErrors,
        handleImageSuccess,
        resetForm,
    };
};
