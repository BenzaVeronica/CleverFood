import { GridItem, Text } from '@chakra-ui/react';

import { blogItem } from '~/store/blog/blog.types';

import UserProfile from '../UserProfile';

type Props = {
    item: blogItem;
};

function Article({ item }: Props) {
    return (
        <GridItem as='article' colSpan={4} bg='white' borderRadius='8px' p={{ base: 4, lg: 6 }}>
            <UserProfile profile={item.profile} />
            <Text fontSize='sm' mt={{ base: 4, lg: 7 }} noOfLines={3}>
                {item.text}
            </Text>
        </GridItem>
    );
}

export default Article;
