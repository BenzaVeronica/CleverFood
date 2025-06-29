import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import { IconTrash } from '~/components/Icons/Trash';
import { BloggerNote } from '~/query/blogs/blogs.type';
import { TEST_ID } from '~/test/test.constant';

type Props = {
    el: BloggerNote;
    onRemove?: (id: string) => void;
};

export function Note({ el, onRemove }: Props) {
    const date = new Date(el.date);
    const formattedDate = !isNaN(date.getTime())
        ? format(date, 'd MMMM HH:mm', { locale: ru })
        : el.date;

    return (
        <Box w='100%' h='100%' bg='white' borderRadius='8px' p={6}>
            <HStack alignItems='end' justifyContent='space-between'>
                <Text data-test-id={TEST_ID.Bloggers.NotesCardDate} color='lime.600' fontSize='sm'>
                    {formattedDate}
                </Text>

                {onRemove && (
                    <IconButton
                        data-test-id={TEST_ID.sprint7.notedeletebutton}
                        size='xs'
                        aria-label={ACCESSIBILITY.notes.delete}
                        icon={<IconTrash color='black' />}
                        onClick={() => onRemove(el._id)}
                        variant='ghost'
                    />
                )}
            </HStack>
            <Text data-test-id={TEST_ID.Bloggers.NotesCardText} mt={4} fontSize='sm'>
                {el.text}
            </Text>
        </Box>
    );
}
