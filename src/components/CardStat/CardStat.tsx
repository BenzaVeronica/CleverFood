import { Button, Flex, Icon } from '@chakra-ui/react';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import PeopleOutline from '../../assets/users.svg?react';

type Props = {
    bookmarks: number | null;
    like?: number | null;
    subscribes?: number | null;
    dataTestIdsubscribes?: string;
    dataTestIdlike?: string;
    dataTestIdbookmarks?: string;
};

export function CardStat(props: Props) {
    return (
        <Flex gap={{ base: 0, lg: 2 }} flexShrink={0}>
            {Number(props?.bookmarks) >= 0 && (
                <Button
                    data-test-id={props.dataTestIdbookmarks}
                    lineHeight='1'
                    p={1}
                    size='xs'
                    leftIcon={<Icon as={Bookmark} boxSize={3} />}
                    colorScheme='lime'
                    variant='ghost'
                >
                    {props.bookmarks}
                </Button>
            )}
            {Number(props?.like) >= 0 && (
                <Button
                    data-test-id={props.dataTestIdlike}
                    lineHeight='1'
                    p={1}
                    size='xs'
                    leftIcon={<Icon as={Like} boxSize={3} />}
                    colorScheme='lime'
                    variant='ghost'
                >
                    {props.like}
                </Button>
            )}
            {Number(props?.subscribes) >= 0 && (
                <Button
                    data-test-id={props.dataTestIdsubscribes}
                    lineHeight='1'
                    p={1}
                    size='xs'
                    leftIcon={<Icon as={PeopleOutline} boxSize={3} />}
                    colorScheme='lime'
                    variant='ghost'
                >
                    {props.subscribes}
                </Button>
            )}
        </Flex>
    );
}
