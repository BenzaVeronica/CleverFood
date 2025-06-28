import { Avatar, Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { getImagePath } from '~/query/api.constants';
import { GetBloggerByIdResponse } from '~/query/blogs/blogs.type';

import PeopleOutline from '../../assets/users.svg?react';
import Loader from '../UI/Loader';
import CustomSubscribeButton from '../UserSubscribeButton';

type Props = {
    profile: GetBloggerByIdResponse;
};

export function UserCardGreen(props: Props) {
    const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false);
    console.log(props.profile.bloggerInfo);

    if (!props.profile) return; // для теста где нет блогера 'should successfully publish a recipe'
    return (
        <Flex
            bg='lime.300'
            borderWidth={1}
            borderRadius='8px'
            px={{ base: 3, md: 6 }}
            py={{ base: 5, md: 6 }}
            gap={{ base: 2, md: 4 }}
            position='relative'
        >
            {isLoadingSubscribe && <Loader />}
            <Avatar
                size='xl'
                src={getImagePath(props.profile.bloggerInfo?.photoLink)}
                name={`${props.profile.bloggerInfo?.firstName} ${props.profile.bloggerInfo?.lastName}`}
            />
            <Stack flex='1'>
                <Flex justifyContent='space-between' alignItems='start'>
                    <Box>
                        <Text fontSize={{ base: 'lg', xl: '2xl' }} fontWeight={600} isTruncated>
                            {props.profile.bloggerInfo?.firstName}{' '}
                            {props.profile.bloggerInfo?.lastName}
                        </Text>
                        <Text fontSize='sm' color='blackAlpha.700'>
                            @{props.profile.bloggerInfo?.login}
                        </Text>
                    </Box>
                    <Text
                        fontSize='sm'
                        top={{ base: 2, md: '0' }}
                        right={{ base: 2, md: '0' }}
                        position={{ base: 'absolute', md: 'initial' }}
                    >
                        Автор рецепта
                    </Text>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <CustomSubscribeButton
                        isSubscribe={props.profile.isFavorite}
                        userId={props.profile.bloggerInfo?._id}
                        onLoadingChange={setIsLoadingSubscribe}
                    />
                    <Button
                        px={[2, 4]}
                        h='24px'
                        fontSize={{ base: '12px', lg: '16px' }}
                        leftIcon={<Icon as={PeopleOutline} boxSize={{ base: 3, lg: 4 }} />}
                        colorScheme='lime'
                        variant='ghost'
                    >
                        {props.profile.totalSubscribers}
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    );
}
