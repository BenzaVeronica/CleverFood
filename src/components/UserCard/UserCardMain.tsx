import { Avatar, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Settings from '~/assets/BsGearFill.svg?react';
import { GetBloggerByIdResponse } from '~/query/blogs/blogs.type';
import { TEST_ID } from '~/test/test.constant';

import CustomSubscribeButton from '../../widgets/CustomSubscribeButton';
import CardStat from '../CardStat';
import Loader from '../UI/Loader';

type Props = {
    profile: GetBloggerByIdResponse;
    dataTestId?: string;
};

export function UserCardMain(props: Props) {
    // const { isTablet } = useBreakpoints();
    const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false);
    const isMyPage = false;
    // console.log(isLoadingSubscribe);

    return (
        <Flex
            p={{ base: 4 }}
            justifyContent='center'
            position='sticky'
            top={0}
            // top={isTablet ? HEIGHT_HEADER : '64px'}
            zIndex={10}
            bg='white'
            data-test-id={props.dataTestId && props.dataTestId}
        >
            {isLoadingSubscribe && (
                <Loader position='absolute' dataTestId={TEST_ID.Bloggers.MobileLoader} />
            )}
            <Flex
                gap={{ base: 6 }}
                w='fit-content'
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems='center'
            >
                {isMyPage && (
                    <Icon as={Settings} position='absolute' right={0} top={0} boxSize='48px' />
                )}
                <Avatar
                    size='2xl'
                    // src={props.profile.img}
                    name={`${props.profile.bloggerInfo.firstName} ${props.profile.bloggerInfo.lastName}`}
                />
                <Stack flex='1'>
                    <Flex
                        flexDirection='column'
                        justifyContent='space-between'
                        alignItems={{ base: 'center', md: 'start' }}
                        gap={3}
                        w='100%'
                        maxW={{ base: '310px', md: '680px' }}
                    >
                        <Text
                            fontSize={{ base: '5xl', xl: '5xl' }}
                            lineHeight='100%'
                            fontWeight={600}
                            width='100%'
                            isTruncated
                            data-test-id={TEST_ID.Bloggers.BloggerUserInfoName}
                        >
                            {props.profile.bloggerInfo.firstName}{' '}
                            {props.profile.bloggerInfo.lastName}
                        </Text>
                        <Text
                            data-test-id={TEST_ID.Bloggers.BloggerUserInfoLogin}
                            fontSize='sm'
                            color='blackAlpha.700'
                        >
                            @{props.profile.bloggerInfo.login}
                        </Text>
                        <Flex justifyContent='space-between' alignItems='center' w='100%'>
                            <CustomSubscribeButton
                                isSubscribe={props.profile.isFavorite}
                                userId={props.profile.bloggerInfo._id}
                                onLoadingChange={setIsLoadingSubscribe}
                                withTooltip
                            />
                            <CardStat
                                bookmarks={props.profile.totalBookmarks}
                                subscribes={props.profile.totalSubscribers}
                                dataTestIdbookmarks={TEST_ID.Bloggers.BloggerFollowersBookmarks}
                                dataTestIdsubscribes={TEST_ID.Bloggers.BloggerFollowersCount}
                            />
                        </Flex>
                    </Flex>
                </Stack>
            </Flex>
        </Flex>
    );
}
