import { Button } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { DrawerProps } from '~/context/DrawerContext';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { useCreateUsersNotesMutation } from '~/query/user/user.api';
import { PageRoutesHash } from '~/routes/PageRoutes.constants';
import { TEST_ID } from '~/test/test.constant';
import { scrollToHash } from '~/utils/useHash';
import { useToastNotifications } from '~/utils/useToastNotifications';

import CustomDrawer from '../UI/CustomDrawer';
import CustomTextareaWithCounter from '../UI/CustomTextareaWithCounter';
import { noteSchema } from './FormDrawerNewNotes.schema';

export function DrawerNewNotes(props: DrawerProps) {
    const [note, setNote] = useState('');
    const [createUserNote] = useCreateUsersNotesMutation();

    const [error, setError] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { showErrorReduxMessage, showSuccessReduxMessage } = useToastNotifications();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const isValid = await noteSchema.isValid({ text: note });
            textareaRef.current?.focus();
            if (!isValid) {
                setError(true);
                return;
            }
            await createUserNote({ text: note }).unwrap();
            scrollToHash(PageRoutesHash.NOTES, 160);
            setError(false);
            showSuccessReduxMessage(TOAST_MESSAGE.NoteCreate[200]);
        } catch (serverError) {
            const err = serverError as CustomErrorResponse;
            if (isServerError(err.status)) {
                showErrorReduxMessage(TOAST_MESSAGE.ShortServerErrorToast);
            }
        }
        props.onClose();
    };

    return (
        <CustomDrawer
            dataTestId={TEST_ID.Drawer.Filter}
            isOpen={props.isOpen}
            onClose={props.onClose}
            title='Новая заметка'
            footerContent={
                <Button colorScheme='black' type='submit' form='note-form'>
                    Опубликовать
                </Button>
            }
        >
            <form id='note-form' onSubmit={handleSubmit}>
                <CustomTextareaWithCounter
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Максимально 160 символов'
                    isInvalid={error}
                    ref={textareaRef}
                />
            </form>
        </CustomDrawer>
    );
}
