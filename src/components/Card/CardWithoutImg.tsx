import { Box, Flex, GridItem, GridItemProps, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { chooseIconCategory, chooseTextCategory } from '~/store/category/utils';
import { recipe } from '~/store/recipe/recipe.types';

import CardStat from '../CardStat';
import Tag from '../UI/CustomTag';

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
                <Box
                    py={{ base: 3, lg: 5 }}
                    px={{ base: 3, lg: 6 }}
                    overflow='hidden'
                    as={Link}
                    to={`/${el.category[0]}/${el.subcategory[0]}/${el.id}`}
                >
                    <Text fontSize='xl' fontWeight={500} isTruncated>
                        {el.title}
                    </Text>
                    <Text fontSize='sm' noOfLines={3} mt={2} mb={6}>
                        {el.description}
                    </Text>

                    <Flex justifyContent='space-between'>
                        <Flex flexWrap='wrap' gap={1} flex='1' minWidth={0}>
                            {el.category.map((categoryItem) => (
                                <Tag
                                    key={`CardWithoutImg_${categoryItem}`}
                                    leftElement={
                                        <Image
                                            src={chooseIconCategory(categoryItem)}
                                            alt={categoryItem}
                                        />
                                    }
                                    text={chooseTextCategory(categoryItem)}
                                    color='lime.50'
                                    maxH={6}
                                    isTruncated
                                />
                            ))}
                        </Flex>
                        <CardStat bookmarks={el.bookmarks} like={el.likes} />
                    </Flex>
                </Box>
            </Flex>
        </GridItem>
    );
}

export default CardWithoutImg;
