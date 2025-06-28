import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage } from '~/localStorage/localStorage';

import { EndpointNames } from '../constants/endpoint-names';
import { MutationApi } from '../types';
import { UserNoteRequest, UserNoteResponse } from '../user/user.types';
import { recipesApiSlice } from './recipe.api';
import { RecipeBookmarksResponse, RecipeIdAndRecipe } from './recipe.types';

export const toggleBookmarkFromCache = async (
    requestParam: RecipeIdAndRecipe,
    { dispatch, queryFulfilled }: MutationApi<RecipeBookmarksResponse>,
) => {
    try {
        const { data: serverData } = await queryFulfilled;
        const userId = getDataFromLocalStorage(localStorageData.userIdForBookmarkTest);
        dispatch(
            recipesApiSlice.util.updateQueryData(
                EndpointNames.GET_RECIPES_BY_USER,
                { userId },
                (draft) => {
                    const dif = requestParam.recipe.bookmarks - serverData.count;
                    if (dif === 1 || !serverData.count) {
                        draft.myBookmarks = draft.myBookmarks.filter(
                            (el) => el._id !== requestParam.recipeId,
                        );
                    }
                    if (dif == -1) {
                        draft.myBookmarks.push(requestParam.recipe);
                    }
                },
            ),
        );
    } catch {
        console.error([EndpointNames.BOOKMARK_RECIPE]);
    }
};

export const addNoteFromCache = async (
    _newNote: UserNoteRequest,
    { dispatch, queryFulfilled }: MutationApi<UserNoteResponse>,
) => {
    try {
        const { data: serverNote } = await queryFulfilled;
        const userId = getDataFromLocalStorage(localStorageData.userIdForBookmarkTest);
        dispatch(
            recipesApiSlice.util.updateQueryData(
                EndpointNames.GET_RECIPES_BY_USER,
                { userId },
                (draft) => {
                    draft.notes.push(serverNote);
                },
            ),
        );
    } catch {
        console.error([EndpointNames.CREATE_USERS_NOTES]);
    }
};
export const deleteNoteFromCache = async (
    id: string,
    { dispatch, queryFulfilled }: MutationApi<void>,
) => {
    let patchResult;
    const userId = getDataFromLocalStorage(localStorageData.userIdForBookmarkTest);
    try {
        patchResult = dispatch(
            recipesApiSlice.util.updateQueryData(
                EndpointNames.GET_RECIPES_BY_USER,
                { userId },
                (draft) => {
                    if (draft?.notes) {
                        draft.notes = draft.notes.filter((note) => note._id !== id);
                    }
                },
            ),
        );
        await queryFulfilled;
    } catch {
        if (patchResult) {
            patchResult.undo();
        }
    }
};
