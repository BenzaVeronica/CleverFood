import { Button, Flex, Icon } from '@chakra-ui/react';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';

type Props = {
    bookmarks: number | null;
    like: number | null;
};

function CardStat(props: Props) {
    return (
        <Flex gap={{ base: 0, lg: 2 }} alignItems='center'>
            {props.bookmarks && (
                <Button
                    p={1}
                    size='xs'
                    leftIcon={<Icon as={Bookmark} boxSize={3} />}
                    colorScheme='lime'
                    variant='ghost'
                >
                    {props.bookmarks}
                </Button>
            )}
            {props.like && (
                <Button
                    p={1}
                    size='xs'
                    leftIcon={<Icon as={Like} boxSize={3} />}
                    colorScheme='lime'
                    variant='ghost'
                >
                    {props.like}
                </Button>
            )}
        </Flex>
    );
}

export default CardStat;
