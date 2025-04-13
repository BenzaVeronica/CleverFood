import { Box, Button, Flex, Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react';

import { masItems } from '~/store/recipe/recipe.constants';

import CardWithoutImg from '../Card/CardWithoutImg';
import { recipes } from './recipes.constants';

type Props = {
    item: recipes;
};

function SectionAbout({ item }: Props) {
    return (
        <Box
            pt={{ base: 8, lg: 10 }}
            // pb={3}
        >
            <Grid
                templateColumns={{
                    base: 'repeat(4, 1fr)',
                    md: 'repeat(12, 1fr)',
                }}
                gap={{ base: 3, lg: 4, xl: 6 }}
                mt={{ base: 1, lg: 0 }}
                pt={{ base: 1, lg: 6 }}
                pb={6}
                borderColor='blackAlpha.200'
                borderTopWidth='1px'
            >
                <GridItem colSpan={{ base: 12, lg: 4, xl: 6 }}>
                    <Text as='h2' fontSize={['2xl', '2xl', '2xl', '3xl', '4xl']} fontWeight='500'>
                        {item.title}
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
                        {item.text}
                    </Text>
                </GridItem>
            </Grid>
            <Grid
                templateColumns={{
                    base: 'repeat(4, 1fr)',
                    md: 'repeat(12, 1fr)',
                }}
                gap={{ base: 3, lg: 4, xl: 6 }}
                mb={4}
            >
                <CardWithoutImg el={masItems[8]} colSpan={{ base: 4, md: 4, xl: 3 }} />
                <CardWithoutImg el={masItems[1]} colSpan={{ base: 4, md: 4, xl: 3 }} />
                <GridItem colSpan={{ base: 4, sm: 4, md: 4, xl: 6 }}>
                    <Stack spacing={{ base: 3, lg: 3 }} margin='auto 0'>
                        {item.recipts.map((el) => (
                            <Flex
                                key={`SectionAbout_${el.id}`}
                                borderColor='blackAlpha.200'
                                borderWidth='1px'
                                borderRadius='8px'
                                px={{ base: 3 }}
                                py={{ base: 3 }}
                                gap={1}
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Image src={el.category.icon} alt={el.category.title} />
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
            </Grid>
        </Box>
    );
}

export default SectionAbout;
