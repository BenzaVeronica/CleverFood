import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';

import { recipe } from '~/store/recipe/recipe.types';

import CardStat from '../CardStat';
import Tag from '../Tag';

type Props = {
    el: recipe;
};

function CardVertical({ el }: Props) {
    // const isHidden = useBreakpointValue({ base: true, md: false });
    const [isHidden] = useMediaQuery('(max-width: 768px)');

    return (
        <Box
            h='100%'
            borderColor='blackAlpha.200'
            borderWidth={1}
            borderRadius='8px'
            width={{ base: '158px', lg: '278px', xl: '322px' }}
            overflow='hidden'
            flexShrink={0}
        >
            <Box width='100%' flexShrink={0} position='relative'>
                <Tag
                    position='absolute'
                    display={{ base: 'flex', lg: 'none' }}
                    leftElement={
                        <Image src={el.category.icon} alt={el.category.title} boxSize={4} />
                    }
                    text={el.category.title}
                    color='lime.150'
                    zIndex={2}
                    top={2}
                    left={2}
                    gap='2px'
                    // p={1}
                    overflow='hidden'
                    whiteSpace='nowrap'
                    w='max-content'
                    // maxW="100%"
                />
                <Image src={el.img} alt={el.title} width='100%' height='100%' objectFit='cover' />
            </Box>
            <Box py={{ base: 2, lg: 4 }} px={{ base: 2, lg: 6 }}>
                <Text
                    fontSize={{ base: 'md', lg: 'lg', xl: 'xl' }}
                    fontWeight={500}
                    whiteSpace={{ base: 'normal', md: 'normal', lg: 'nowrap' }}
                    // noOfLines={{ base: 2, lg: 1}}
                    noOfLines={2}
                    isTruncated
                >
                    {el.title}
                </Text>
                <Text
                    fontSize='sm'
                    hidden={isHidden}
                    // display={{base: 'none', md: 'block'}}
                    noOfLines={{ base: undefined, md: 3 }}
                    mt={2}
                    mb={6}
                >
                    {el.text}
                </Text>

                <Flex justifyContent='space-between' maxH={6} mt={{ base: 6, md: 1 }}>
                    <Tag
                        display={{ base: 'none', lg: 'flex' }}
                        leftElement={<Image src={el.category.icon} alt={el.category.title} />}
                        text={el.category.title}
                        color='lime.150'
                        maxH={6}
                        isTruncated
                    />
                    <CardStat bookmarks={el.bookmarks} like={el.like} />
                </Flex>
            </Box>
        </Box>
    );
}

export default CardVertical;
