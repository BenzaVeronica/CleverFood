import { Box, Flex, GridItem, GridItemProps, Image, Text } from '@chakra-ui/react';

import { recipe } from '~/store/recipe/recipe.types';

import CardStat from '../CardStat';
import Tag from '../Tag';

type Props = {
    el: recipe;
    colSpan: GridItemProps['colSpan'];
};

function CardWithoutImg({ el, colSpan }: Props) {
    return (
        <GridItem
            colSpan={colSpan}
            borderColor='blackAlpha.200'
            borderWidth='1px'
            borderRadius='8px'
        >
            <Flex>
                <Box py={{ base: 3, lg: 5 }} px={{ base: 3, lg: 6 }} overflow='hidden'>
                    <Text fontSize='xl' fontWeight={500} isTruncated>
                        {el.title}
                    </Text>
                    <Text fontSize='sm' noOfLines={3} mt={2} mb={6}>
                        {el.text}
                    </Text>

                    <Flex justifyContent='space-between' maxH={6}>
                        <Tag
                            leftElement={<Image src={el.category.icon} alt={el.category.title} />}
                            text={el.category.title}
                            color='lime.50'
                            maxH={6}
                            isTruncated
                        />
                        <CardStat bookmarks={el.bookmarks} like={el.like} />
                    </Flex>
                </Box>
            </Flex>
        </GridItem>
    );
}

export default CardWithoutImg;
