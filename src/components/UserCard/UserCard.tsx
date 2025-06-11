import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';

import { BloggerShortInfo } from '~/query/blogs/blogs.type';
import { PageRoutes, PageRoutesHash } from '~/routes/PageRoutes.constants';
import { TEST_ID } from '~/test/test.constant';
import { pluralizeRecipes } from '~/utils/pluralizeRecipes';

import CustomSubscribeButton from '../../widgets/CustomSubscribeButton';
import CardStat from '../CardStat';
import Loader from '../UI/Loader';
import UserProfile from '../UserProfile';

type Props = {
    item: BloggerShortInfo;
    isVisibleStatBox?: boolean;
    isVisibleSubscribeBtn?: boolean;
    beidgeCountNewRecipes?: number;
};

export function UserCard({
    isVisibleSubscribeBtn,
    isVisibleStatBox,
    item,
    beidgeCountNewRecipes,
}: Props) {
    const isVertical = isVisibleSubscribeBtn;
    const [isLoadingSubscribe, setIsLoadingSubscribe] = useState(false);

    return (
        <Flex
            data-test-id={TEST_ID.Bloggers.BlogsCard}
            bg='white'
            layerStyle='card'
            p={{ base: 4, lg: 6 }}
            position='relative'
            h='100%'
            flexDirection='column'
            justifyContent='space-between'
        >
            {isLoadingSubscribe && (
                <Loader position='absolute' dataTestId={TEST_ID.Bloggers.MobileLoader} />
            )}
            <UserProfile profile={item} />
            {Number(beidgeCountNewRecipes) > 0 && (
                <Text
                    data-test-id={TEST_ID.Bloggers.BlogsCardNewRecipesBadge}
                    h={6}
                    bg='blackAlpha.100'
                    px={1}
                    position='absolute'
                    right={2}
                    top={2}
                    fontSize='sm'
                >
                    {beidgeCountNewRecipes && pluralizeRecipes(beidgeCountNewRecipes)}
                </Text>
            )}
            <Text
                data-test-id={TEST_ID.Bloggers.BlogsCardNotesText}
                fontSize='sm'
                mt={{ base: 4, lg: 7 }}
                noOfLines={3}
                height='63px'
            >
                {item.notes[0]?.text || ''}
            </Text>
            {isVisibleStatBox && (
                <Flex
                    justifyContent='space-between'
                    mt={4}
                    alignItems='end'
                    flexDirection={isVertical ? 'column' : 'row'}
                >
                    <CardStat bookmarks={item.bookmarksCount} subscribes={item.subscribersCount} />
                    <HStack spacing={2} mt={2} order={isVertical ? 1 : -1}>
                        {isVisibleSubscribeBtn ? (
                            <CustomSubscribeButton
                                isSubscribe={item.isFavorite}
                                userId={item._id}
                                onLoadingChange={setIsLoadingSubscribe}
                            />
                        ) : (
                            <Button
                                as={Link}
                                to={`${PageRoutes.BLOGS}/${item._id}`}
                                data-test-id={TEST_ID.Bloggers.BlogsCardRecipesButton}
                                h={6}
                                size={{ base: 'xs', lg: 'sm' }}
                                variant='btnGreen'
                            >
                                Рецепты
                            </Button>
                        )}
                        <Button
                            as={Link}
                            to={`${PageRoutes.BLOGS}/${item._id}#${PageRoutesHash.NOTES}`}
                            data-test-id={TEST_ID.Bloggers.BlogsCardNotesButton}
                            h={6}
                            size={{ base: 'xs', lg: 'sm' }}
                            variant='btnOutlineGreen'
                        >
                            Читать
                        </Button>
                    </HStack>
                </Flex>
            )}
        </Flex>
    );
}
