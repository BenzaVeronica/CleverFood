import { Button, Flex, FlexProps, Icon } from '@chakra-ui/react';

import OkIcon from '~/assets/ok-filled.svg?react';
import { useGetStatFromBloggerByIdAndStat } from '~/query/user/user.utils';
import { TEST_ID } from '~/test/test.constant';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import People from '../../assets/users-filled.svg?react';

type Props = {
    flexProps?: FlexProps;
};
export function UserStat({ flexProps }: Props) {
    const stat = useGetStatFromBloggerByIdAndStat();
    return (
        <Flex alignItems='center' {...flexProps} data-test-id={TEST_ID.sprint7.userstatsblock}>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={OkIcon} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                {stat.totalRecommends}
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={Bookmark} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                {stat.totalBookmarks}
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={Like} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                {stat.totalLikes}
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={People} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                {stat.totalSubscribers}
            </Button>
        </Flex>
    );
}
