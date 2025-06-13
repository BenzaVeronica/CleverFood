import { Box, Button, Flex, GridItem, SimpleGrid, Text } from '@chakra-ui/react';

import { BloggerShortInfo } from '~/query/blogs/blogs.type';
import { TEST_ID } from '~/test/test.constant';

import UserCard from '../UserCard';

type Props = {
    mas: BloggerShortInfo[];
    title?: string;
    isFavBlock?: boolean;
    colSpan?: number;
    handleToggle?: () => void;
    expanded?: boolean;
    isVisNewRecipesCount?: boolean;
};

export function UserList({
    mas,
    isFavBlock = false,
    title,
    colSpan = 4,
    expanded = false,
    handleToggle,
    isVisNewRecipesCount = false,
}: Props) {
    return (
        <Box
            as='section'
            bg={isFavBlock ? 'lime.300' : 'blackAlpha.50'}
            borderRadius='16px'
            p={{ base: 3, lg: 6 }}
            data-test-id={
                isFavBlock ? TEST_ID.Bloggers.BlogsFavoritesBox : TEST_ID.Bloggers.BlogsOthersBox
            }
        >
            {title && (
                <Flex mb={6} justifyContent='space-between'>
                    <Text
                        as='h2'
                        fontSize={['2xl', '2xl', '2xl', '3xl', '4xl']}
                        fontWeight={{ base: 500, lg: 400 }}
                    >
                        {title}
                    </Text>
                </Flex>
            )}
            <SimpleGrid
                columns={{ base: 4, md: 12 }}
                spacing={{ base: 3, lg: 4 }}
                borderRadius='16px'
                data-test-id={
                    isFavBlock
                        ? TEST_ID.Bloggers.BlogsFavoritesGrid
                        : TEST_ID.Bloggers.BlogsOthersGrid
                }
            >
                {mas.map((el) => (
                    <GridItem key={`UserList_${el._id}`} as='article' colSpan={colSpan}>
                        <UserCard
                            item={el}
                            isVisibleStatBox
                            isVisibleSubscribeBtn={!isFavBlock}
                            beidgeCountNewRecipes={
                                isVisNewRecipesCount ? el.newRecipesCount : undefined
                            }
                        />
                    </GridItem>
                ))}
            </SimpleGrid>
            {handleToggle && (
                <Button
                    data-test-id={TEST_ID.Bloggers.BlogsOthersButton}
                    onClick={handleToggle}
                    mt={4}
                    mx='auto'
                    display='block'
                >
                    {expanded ? 'Свернуть' : 'Все авторы'}
                </Button>
            )}
        </Box>
    );
}
