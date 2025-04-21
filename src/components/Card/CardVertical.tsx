import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { chooseIconCategory, chooseTextCategory } from '~/store/category/utils';
import { recipe } from '~/store/recipe/recipe.types';
import useBreakpoints from '~/utils/useBreakpoints';

import CardStat from '../CardStat';
import Tag from '../UI/CustomTag';

type Props = {
    el: recipe;
};

function CardVertical({ el }: Props) {
    // const isHidden = useBreakpointValue({ base: true, md: false });
    const { isTablet } = useBreakpoints();

    return (
        <Box
            h='100%'
            borderColor='blackAlpha.200'
            borderWidth={1}
            borderRadius='8px'
            width={{ base: '156px', lg: '278px', xl: '322px' }}
            flexShrink={0}
            display='block'
            as={Link}
            to={`/${el.category[0]}/${el.subcategory[0]}/${el.id}`}
        >
            <Box
                width='100%'
                flexShrink={0}
                position='relative'
                overflow='hidden'
                h={{ base: '128px', lg: '230px' }}
            >
                <Flex
                    flexWrap='wrap'
                    gap={1}
                    flex='1'
                    minWidth={0}
                    position='absolute'
                    zIndex={2}
                    top={2}
                    left={2}
                >
                    {el.category.map((categoryItem) => (
                        <Tag
                            key={`CardVertical_${categoryItem}`}
                            display={{ base: 'inline-flex', lg: 'none' }}
                            leftElement={
                                <Image
                                    src={chooseIconCategory(categoryItem)}
                                    alt={categoryItem}
                                    boxSize={4}
                                />
                            }
                            text={chooseTextCategory(categoryItem)}
                            color='lime.150'
                            gap='2px'
                            // p={1} overflow='hidden' whiteSpace='nowrap' w='max-content' // maxW="100%"
                        />
                    ))}
                </Flex>
                <Image src={el.image} alt={el.title} width='100%' height='100%' objectFit='cover' />
            </Box>
            <Box py={{ base: 2, lg: 4 }} px={{ base: 2, lg: 6 }}>
                <Text
                    fontSize={{ base: 'md', lg: 'lg', xl: 'xl' }}
                    fontWeight={500}
                    whiteSpace={{ base: 'normal', md: 'normal', lg: 'nowrap' }}
                    noOfLines={{ base: 2, lg: 1 }}
                    // noOfLines={2}
                    isTruncated
                >
                    {el.title}
                </Text>
                <Text
                    userSelect='auto'
                    pt={1}
                    fontSize='sm'
                    hidden={isTablet}
                    // display={{base: 'none', md: 'block'}}
                    noOfLines={{ base: undefined, md: 3 }}
                    // mb={6}
                >
                    {el.description}
                </Text>

                <Flex justifyContent='space-between' mt={{ base: 1, lg: 6 }} gap={1}>
                    <Flex
                        flexDirection='column'
                        // flexWrap='wrap'
                        gap={1}
                        // flex='1'
                    >
                        {el.category.map((categoryItem) => (
                            <Tag
                                key={`CardVertical1_${categoryItem}`}
                                display={{ base: 'none', lg: 'inline-flex' }}
                                leftElement={
                                    <Image
                                        src={chooseIconCategory(categoryItem)}
                                        alt={categoryItem}
                                    />
                                }
                                text={chooseTextCategory(categoryItem)}
                                color='lime.150'
                                maxH={6}
                                minWidth='0'
                                maxW={{ base: '140px', xl: '180px' }}
                                // flex='1'
                            />
                        ))}
                    </Flex>
                    <CardStat bookmarks={el.bookmarks} like={el.likes} />
                </Flex>
            </Box>
        </Box>
    );
}

export default CardVertical;
