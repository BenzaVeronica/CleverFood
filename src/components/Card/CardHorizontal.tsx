import {
    Avatar,
    Box,
    Button,
    Flex,
    GridItem,
    GridItemProps,
    Icon,
    IconButton,
    Image,
    Stack,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';

import { recipe } from '~/store/recipe/recipe.types';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import CardStat from '../CardStat';
import Tag from '../Tag';

type Props = {
    el: recipe;
    colSpan: GridItemProps['colSpan'];
};

function CardHorizontal({ el, colSpan }: Props) {
    // const isHidden = useBreakpointValue({ base: true, xs: true, xl: false });
    // const isHidden = useBreakpointValue({ base: true, md: false });
    const [isHidden] = useMediaQuery('(max-width: 768px)');

    return (
        <GridItem
            colSpan={colSpan}
            borderColor='blackAlpha.200'
            borderWidth='1px'
            borderRadius='8px'
            overflow='hidden'
            h='100%'
            display='flex'
        >
            <Box
                maxW={{ base: '158px', lg: '345px' }}
                // width="55%"
                flexShrink={0}
                overflow='hidden'
                position='relative'
            >
                <Image src={el.img} alt={el.title} width='100%' height='100%' objectFit='cover' />
                {el.recommend && (
                    <Tag
                        position='absolute'
                        left={6}
                        bottom={5}
                        leftElement={
                            <Avatar
                                size='2xs'
                                src={el.recommend.img}
                                name={`${el.recommend.name} ${el.recommend.surname}`}
                            />
                        }
                        text={`${el.recommend.name} ${el.recommend.surname}`}
                        color='lime.150'
                        display={{ base: 'none', lg: 'flex' }}
                        zIndex={2}
                        py={1}
                        px={2}
                        gap={2}
                        overflow='hidden'
                        whiteSpace='nowrap'
                        w='max-content'
                        // maxW="100%"
                    />
                )}
                <Tag
                    position='absolute'
                    zIndex={2}
                    top={2}
                    left={2}
                    gap='2px'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    display={{ base: 'flex', lg: 'none' }}
                    leftElement={
                        <Image src={el.category.icon} alt={el.category.title} boxSize={4} />
                    }
                    text={el.category.title}
                    color='lime.50'
                />
            </Box>

            <Flex
                py={{ base: 2, lg: 5 }}
                px={{ base: 2, lg: 6 }}
                direction='column'
                justifyContent='space-between'
                gap={{ base: 0, lg: 6 }}
                flex='1'
            >
                <Flex justifyContent='space-between'>
                    <Tag
                        display={{ base: 'none', lg: 'flex' }}
                        leftElement={
                            <Image src={el.category.icon} alt={el.category.title} boxSize={4} />
                        }
                        text={el.category.title}
                        color='lime.50'
                    />
                    <CardStat bookmarks={el.bookmarks} like={el.like} />
                </Flex>
                <Stack spacing={1}>
                    <Text fontSize='xl' fontWeight={500} noOfLines={{ base: 2, lg: 1 }}>
                        {el.title}
                    </Text>
                    <Text fontSize='sm' noOfLines={{ base: undefined, lg: 3 }} hidden={isHidden}>
                        {el.text}
                    </Text>
                </Stack>
                <Flex gap={2} justifyContent='flex-end'>
                    <Button
                        display={{ base: 'none', lg: 'flex' }}
                        size='sm'
                        variant='outline'
                        colorScheme='black'
                        color='blackAlpha.800'
                        leftIcon={<Icon as={Bookmark} />}
                    >
                        Сохранить
                    </Button>
                    <IconButton
                        aria-label='Bookmark'
                        variant='outline'
                        colorScheme='black'
                        color='blackAlpha.800'
                        size='xs'
                        icon={<Icon as={Bookmark} boxSize={3} />}
                        display={{ base: 'flex', lg: 'none' }}
                    />
                    <Button size={{ base: 'xs', lg: 'sm' }} colorScheme='black' color='white'>
                        Готовить
                    </Button>
                </Flex>
            </Flex>
        </GridItem>
    );
}

export default CardHorizontal;
