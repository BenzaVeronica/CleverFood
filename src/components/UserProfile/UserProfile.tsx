import { Avatar, Box, Flex, FlexProps, Text } from '@chakra-ui/react';

import { profile } from '~/store/blog/blog.types';

type Props = {
    profile: profile;
    showOnMobile?: boolean;
} & FlexProps;

function UserProfile({ profile, showOnMobile = true, ...flexProps }: Props) {
    const displayValue = showOnMobile ? 'flex' : { base: 'none', lg: 'flex' };

    return (
        <Flex gap={3} display={displayValue} alignItems='center' {...flexProps} minW={0}>
            <Avatar size='md' src={profile.img} name={`${profile.name} ${profile.surname}`} />
            <Box flex='1' minW={0}>
                <Text fontWeight={500} fontSize='lg' isTruncated>
                    {profile.name} {profile.surname}
                </Text>
                <Text fontSize='sm' lineHeight='20px' color='blackAlpha.700'>
                    {profile.username}
                </Text>
            </Box>
        </Flex>
    );
}
export default UserProfile;
