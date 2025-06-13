import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import { BloggerNote } from '~/query/blogs/blogs.type';
import { TEST_ID } from '~/test/test.constant';
import useBreakpoints from '~/utils/useBreakpoints';

import { Note } from './Note';

type Props = {
    notes: BloggerNote[];
};

export function NoteList({ notes }: Props) {
    const [showAll, setShowAll] = useState(false);
    const textBtn = showAll ? 'Свернуть' : 'Показать больше';
    const { isMobile } = useBreakpoints();
    const initialCount = isMobile ? 2 : 3;
    return (
        <>
            <Flex gap={4} flexWrap='wrap' data-test-id={TEST_ID.Bloggers.BloggerUserNotesGrid}>
                {notes.map((el, index) => {
                    const isLastRow = index >= Math.floor(notes.length / 3) * 3;
                    const isLastTwo = notes.length % 3 === 2 && isLastRow;
                    const isHidden = !showAll && index >= initialCount;

                    return (
                        <Box
                            key={index}
                            flexBasis={
                                isMobile
                                    ? '100%'
                                    : isLastTwo
                                      ? 'calc(50% - 8px)'
                                      : 'calc(33.7% - 16px)'
                            }
                            display={isHidden ? 'none' : 'block'}
                        >
                            <Note el={el} />
                        </Box>
                    );
                })}
            </Flex>
            {notes.length > initialCount && (
                <HStack w='full' justifyContent='center' mt={4}>
                    <Button
                        data-test-id={TEST_ID.Bloggers.BloggerUserNotesButton}
                        onClick={() => setShowAll(!showAll)}
                        variant='plain'
                    >
                        {textBtn}
                    </Button>
                </HStack>
            )}
        </>
    );
}
