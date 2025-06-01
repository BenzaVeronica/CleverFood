import { ApplicationState } from '../configure-store';

export const selectRecipeEmptyForm = (state: ApplicationState) => state.recipeForm.emptyForm;
export const selectRecipeFormData = (state: ApplicationState) => state.recipeForm.form;
export const selectIsDirty = (state: ApplicationState): boolean => state.recipeForm.hasChanges;
