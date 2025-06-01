import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';

import { blogItem } from '~/store/blog/blog.types';

import Subscribe from '../../assets/user-plus.svg?react';
import CardStat from '../CardStat';
import UserProfile from '../UserProfile';

type Props = {
    item: blogItem;
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
    return (
        <Box bg='white' borderRadius='8px' p={{ base: 4, lg: 6 }} position='relative'>
            {beidgeCountNewRecipes && (
                <Text
                    h={6}
                    bg='blackAlpha.100'
                    px={1}
                    position='absolute'
                    right={2}
                    top={2}
                    fontSize='sm'
                >
                    {beidgeCountNewRecipes} новый рецепт
                </Text>
            )}
            <UserProfile profile={item.profile} />
            <Text fontSize='sm' mt={{ base: 4, lg: 7 }} noOfLines={3}>
                {item.text}
            </Text>
            {isVisibleStatBox && (
                <Flex justifyContent='space-between' alignItems='center' mt={4}>
                    <HStack spacing={2}>
                        {isVisibleSubscribeBtn ? (
                            <Button
                                h={6}
                                size='sm'
                                variant='btnMain'
                                leftIcon={<Icon as={Subscribe} />}
                            >
                                Подписаться
                            </Button>
                        ) : (
                            <Button h={6} size='sm' variant='btnGreen'>
                                Рецепты
                            </Button>
                        )}
                        <Button h={6} size='sm' variant='btnOutlineGreen'>
                            Читать
                        </Button>
                    </HStack>
                    <CardStat bookmarks={10} like={258} />
                </Flex>
            )}
        </Box>
    );
}
