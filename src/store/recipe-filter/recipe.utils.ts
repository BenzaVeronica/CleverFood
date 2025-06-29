import { localStorageData } from '~/localStorage/constants';
import { getDataFromLocalStorage } from '~/localStorage/localStorage';
import { BloggerDraft } from '~/query/blogs/blogs.type';

import { DraftWithId } from '../recipe-form/recipe-form-types';
import { Recipe } from './recipe.types';

export function isBloggerDraft(el: Recipe | BloggerDraft): boolean {
    return !('authorId' in el);
}

export function getCurrentDraft(draftId: string | undefined) {
    const drafts = getDataFromLocalStorage(localStorageData.drafts) as DraftWithId[];
    return drafts?.find((el) => el._id === draftId) || null;
}
