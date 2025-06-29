import { Avatar, Flex, FlexProps, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import Settings from '~/assets/BsGearFill.svg?react';
import { getImagePath } from '~/query/api.constants';
import { GetBloggerInfoForCard } from '~/query/blogs/blogs.type';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { TEST_ID } from '~/test/test.constant';
import {
    HEIGHT_HEADER,
    HEIGHT_HEADER_TABLET,
    WIDTH_LEFT_MENU,
    WIDTH_RIGHT_ASIDE,
} from '~/theme/ui.constants';
import useBreakpoints from '~/utils/useBreakpoints';

import CardStat from '../CardStat';
import Loader from '../UI/Loader';
import CustomSubscribeButton from '../UserSubscribeButton';

type Props = {
    profile: GetBloggerInfoForCard;
    isMyPage?: boolean;
    dataTestId?: {
        box: string;
        name: string;
        login: string;
    };
    isFull?: boolean;
};

export function UserCardMain({ profile, dataTestId, isFull = true, isMyPage = false }: Props) {
    const { isSmallDesktop } = useBreakpoints();
    const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false);
    const styleFixed: FlexProps = useMemo(
        () => ({
            position: 'fixed',
            top: !isSmallDesktop ? HEIGHT_HEADER : HEIGHT_HEADER_TABLET,
            left: !isSmallDesktop ? WIDTH_LEFT_MENU : 0,
            right: !isSmallDesktop ? WIDTH_RIGHT_ASIDE : 0,
            zIndex: 10,
        }),
        [isSmallDesktop],
    );

    return (
        <Flex
            p={{ base: 4 }}
            justifyContent='center'
            zIndex={5}
            bg='white'
            data-test-id={dataTestId?.box}
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
                        data-test-id={TEST_ID.sprint7.settingsbutton}
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
                    src={getImagePath(profile.bloggerInfo?.photoLink)}
                    name={`${profile.bloggerInfo?.firstName} ${profile.bloggerInfo?.lastName}`}
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
                            data-test-id={dataTestId?.name}
                        >
                            {profile.bloggerInfo?.firstName} {profile.bloggerInfo?.lastName}
                        </Text>
                        <Text data-test-id={dataTestId?.login} fontSize='sm' color='blackAlpha.700'>
                            @{profile.bloggerInfo?.login}
                        </Text>
                        <Flex justifyContent='space-between' alignItems='center' w='100%'>
                            {!isMyPage && profile.isFavorite && (
                                <CustomSubscribeButton
                                    isSubscribe={profile.isFavorite}
                                    userId={profile.bloggerInfo?._id}
                                    onLoadingChange={setIsLoadingSubscribe}
                                    withTooltip
                                />
                            )}
                            <CardStat
                                bookmarks={profile.totalBookmarks}
                                subscribes={profile.totalSubscribers}
                                dataTestId={TEST_ID.sprint7.userprofile.statsblock}
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
