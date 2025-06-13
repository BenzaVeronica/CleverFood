import { Avatar, Flex, FlexProps, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import Settings from '~/assets/BsGearFill.svg?react';
import { GetBloggerByIdResponse } from '~/query/blogs/blogs.type';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { TEST_ID } from '~/test/test.constant';
import { HEIGHT_HEADER, HEIGHT_HEADER_TABLET } from '~/theme/ui.constants';
import useBreakpoints from '~/utils/useBreakpoints';

import CardStat from '../CardStat';
import Loader from '../UI/Loader';
import CustomSubscribeButton from '../UserSubscribeButton';

type Props = {
    profile: GetBloggerByIdResponse;
    isMyPage?: boolean;
    dataTestId?: string;
    isFull?: boolean;
};

export function UserCardMain({ profile, dataTestId, isFull, isMyPage = false }: Props) {
    const { isTablet } = useBreakpoints();
    const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false);
    const styleFixed: FlexProps = useMemo(() => {
        if (!isMyPage) {
            return {
                position: 'fixed',
                //   top: { base: HEIGHT_HEADER_TABLET, md: HEIGHT_HEADER },
                top: isTablet ? HEIGHT_HEADER_TABLET : HEIGHT_HEADER,
                left: 0,
                right: 0,
                zIndex: 1,
            };
        }
        return {};
    }, [isMyPage, isTablet]);

    return (
        <Flex
            p={{ base: 4 }}
            justifyContent='center'
            zIndex={1}
            bg='white'
            data-test-id={dataTestId && dataTestId}
            {...styleFixed}
        >
            <Flex
                gap={{ base: 6 }}
                w={isFull ? 'full' : 'fit-content'}
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems='center'
                position='relative'
            >
                {isMyPage && (
                    <IconButton
                        // data-test-id='search-button'
                        aria-label={ACCESSIBILITY.nav.settings}
                        position='absolute'
                        right={0}
                        top={0}
                        bg='transparent'
                        icon={<Icon as={Settings} boxSize={12} />}
                        as={Link}
                        to={PageRoutes.SETTINGS}
                    />
                )}
                <Avatar
                    size='2xl'
                    // src={profile.img}
                    name={`${profile.bloggerInfo.firstName} ${profile.bloggerInfo.lastName}`}
                />
                <Stack flex='1'>
                    <Flex
                        flexDirection='column'
                        justifyContent='space-between'
                        alignItems={{ base: 'center', md: 'start' }}
                        gap={3}
                        w='100%'
                        maxW={isFull ? '100%' : { base: '310px', md: '680px' }}
                    >
                        <Text
                            fontSize={{ base: '5xl', xl: '5xl' }}
                            lineHeight='100%'
                            fontWeight={600}
                            width='100%'
                            isTruncated
                            data-test-id={TEST_ID.Bloggers.BloggerUserInfoName}
                        >
                            {profile.bloggerInfo.firstName} {profile.bloggerInfo.lastName}
                        </Text>
                        <Text
                            data-test-id={TEST_ID.Bloggers.BloggerUserInfoLogin}
                            fontSize='sm'
                            color='blackAlpha.700'
                        >
                            @{profile.bloggerInfo.login}
                        </Text>
                        <Flex justifyContent='space-between' alignItems='center' w='100%'>
                            {!isMyPage && (
                                <CustomSubscribeButton
                                    isSubscribe={profile.isFavorite}
                                    userId={profile.bloggerInfo._id}
                                    onLoadingChange={setIsLoadingSubscribe}
                                    withTooltip
                                />
                            )}
                            <CardStat
                                bookmarks={profile.totalBookmarks}
                                subscribes={profile.totalSubscribers}
                                dataTestIdbookmarks={TEST_ID.Bloggers.BloggerFollowersBookmarks}
                                dataTestIdsubscribes={TEST_ID.Bloggers.BloggerFollowersCount}
                            />
                        </Flex>
                    </Flex>
                </Stack>
                {isLoadingSubscribe && (
                    <Loader position='absolute' dataTestId={TEST_ID.Bloggers.MobileLoader} />
                )}
            </Flex>
        </Flex>
    );
}
