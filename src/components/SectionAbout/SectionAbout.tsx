import { Box, Button, Flex, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';

import { selectCategoryBySubCategoryId } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';
import { Recipe } from '~/store/recipe-filter/recipe.types';

import { CardWithoutImg } from '../Card/CardWithoutImg';
import { CustomImage } from '../UI/CustomImage/CustomImage';

type Props = {
    items: Recipe[];
    randomSubCategoryId: string | null;
};

export function SectionAbout({ items, randomSubCategoryId }: Props) {
    const category = useAppSelector(selectCategoryBySubCategoryId(randomSubCategoryId));
    if (!category) return null;
    return (
        <Box pt={{ base: 8, lg: 10 }}>
            <SimpleGrid
                columns={{ base: 4, md: 12 }}
                spacing={{ base: 3, lg: 4, xl: 6 }}
                mt={{ base: 1, lg: 0 }}
                pt={{ base: 1, lg: 6 }}
                pb={6}
                layerStyle='card'
            >
                <GridItem colSpan={{ base: 12, lg: 4, xl: 6 }}>
                    <Text as='h2' fontSize={['2xl', '2xl', '2xl', '3xl', '4xl']} fontWeight='500'>
                        {category.title}
                    </Text>
                </GridItem>
                <GridItem colSpan={{ base: 12, lg: 8, xl: 6 }}>
                    <Text
                        fontSize={{ base: 'sm', lg: 'md' }}
                        noOfLines={4}
                        fontWeight={500}
                        color='blackAlpha.600'
                        ml={{ base: 0, lg: 2, xl: 0 }}
                    >
                        {category.description}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 4, md: 12 }} spacing={{ base: 3, lg: 4, xl: 6 }} mb={4}>
                {items.slice(0, 2).map((el) => (
                    <CardWithoutImg
                        key={`card_${el._id}`}
                        el={el}
                        colSpan={{ base: 4, md: 4, xl: 3 }}
                    />
                ))}
                <GridItem colSpan={{ base: 4, sm: 4, md: 4, xl: 6 }}>
                    <Stack spacing={{ base: 3, lg: 3 }} margin='auto 0'>
                        {items.slice(2, 5).map((el) => (
                            <Flex
                                key={`SectionAbout_${el._id}`}
                                layerStyle='card'
                                px={{ base: 3 }}
                                py={{ base: 3 }}
                                gap={1}
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <CustomImage src={category.icon} alt={category.title} />
                                <Text
                                    flex='1'
                                    isTruncated
                                    fontWeight={500}
                                    fontSize={{ base: 'md', lg: 'xl' }}
                                >
                                    {' '}
                                    {el.title}
                                </Text>
                                <Button
                                    size={{ base: 'sm', md: 'xs', lg: 'sm' }}
                                    color='lime.600'
                                    variant='outline'
                                    colorScheme='lime'
                                    px={{ base: 1, lg: 3 }}
                                >
                                    Готовить
                                </Button>
                            </Flex>
                        ))}
                    </Stack>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
}
