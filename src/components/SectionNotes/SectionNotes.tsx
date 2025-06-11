import { Box, Button, HStack } from '@chakra-ui/react';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import IconPencil from '~/assets/pensil_without.svg?react';
import { BloggerNote } from '~/query/blogs/blogs.type';
import { TEST_ID } from '~/test/test.constant';

import NoteList from '../NoteList';
import CustomTitleWithCount from '../UI/CustomTitleWithCount';

type Props = {
    id: string;
    notes: BloggerNote[];
    handleAddNote?: () => void;
};
export function SectionNotes({ id, notes, handleAddNote }: Props) {
    return (
        <Box
            id={id}
            data-test-id={TEST_ID.Bloggers.BlogNotesBox}
            as='section'
            bg='blackAlpha.50'
            borderRadius='8px'
            p={{ base: 3, lg: 6 }}
        >
            <HStack mb={4} justifyContent='space-between'>
                <HStack>
                    <CustomTitleWithCount
                        title='Заметки'
                        count={notes.length}
                        dataTestId={TEST_ID.Bloggers.BloggerUserNotesCount}
                    />
                </HStack>
                {handleAddNote && (
                    <Button
                        onClick={handleAddNote}
                        size='sm'
                        variant='btnOutlineBlack'
                        leftIcon={<IconPencil />}
                        aria-label={ACCESSIBILITY.notes.add}
                    >
                        Новая заметка
                    </Button>
                )}
            </HStack>
            <NoteList notes={notes} />
        </Box>
    );
}
