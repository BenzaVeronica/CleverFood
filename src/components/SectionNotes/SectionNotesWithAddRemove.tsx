import { BoxProps } from '@chakra-ui/react';

import { useDrawers } from '~/context/DrawerContext';
import { BloggerNote } from '~/query/blogs/blogs.type';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { useDeleteUsersNotesMutation } from '~/query/user/user.api';
import { PageRoutesHash } from '~/routes/PageRoutes.constants';
import { useToastNotifications } from '~/utils/useToastNotifications';

import DrawerNewNotes from '../DrawerNewNotes';
import { SectionNotes } from './SectionNotes';

type Props = BoxProps & {
    data: BloggerNote[];
};
export function SectionNotesWithAddRemove({ data, ...props }: Props) {
    const { newRecipeDrawer } = useDrawers();
    const [deleteNote] = useDeleteUsersNotesMutation();
    const { handleServerError, showSuccessReduxMessage } = useToastNotifications();
    const handleRemove = async (id: string) => {
        try {
            await deleteNote(id).unwrap();
            showSuccessReduxMessage(TOAST_MESSAGE.NoteDelete[200]);
        } catch (error) {
            handleServerError(error);
        }
    };
    return (
        <>
            <SectionNotes
                id={PageRoutesHash.NOTES}
                notes={data ?? []}
                handleAddNote={newRecipeDrawer.onOpen}
                onRemove={handleRemove}
                {...props}
            />
            {newRecipeDrawer.isOpen && (
                <DrawerNewNotes isOpen={newRecipeDrawer.isOpen} onClose={newRecipeDrawer.onClose} />
            )}
        </>
    );
}
