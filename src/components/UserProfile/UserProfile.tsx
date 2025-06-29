import { Avatar, Box, Flex, FlexProps, Text } from '@chakra-ui/react';

import { getImagePath } from '~/query/api.constants';
import { BloggerInfo, BloggerShortInfo } from '~/query/blogs/blogs.type';
import { UserInfo } from '~/query/user/user.types';
import { TEST_ID } from '~/test/test.constant';

type Props = {
    profile: BloggerShortInfo | BloggerInfo | UserInfo | undefined;
} & FlexProps;

export function UserProfile({ profile, ...flexProps }: Props) {
    if (!profile) return;
    return (
        <Flex gap={3} display='flex' alignItems='center' {...flexProps} minW={0}>
            <Avatar
                size='md'
                src={getImagePath(profile?.photoLink)}
                name={`${profile.firstName} ${profile.lastName}`}
            />
            <Box flex='1' minW={0}>
                <Text
                    data-test-id={TEST_ID.Bloggers.BlogsCardName}
                    fontWeight={500}
                    fontSize='lg'
                    isTruncated
                >
                    {profile.firstName} {profile.lastName}
                </Text>
                <Text
                    data-test-id={TEST_ID.Bloggers.BlogsCardLogin}
                    fontSize='sm'
                    lineHeight='20px'
                    color='blackAlpha.700'
                >
                    @{profile.login}
                </Text>
            </Box>
        </Flex>
    );
}
