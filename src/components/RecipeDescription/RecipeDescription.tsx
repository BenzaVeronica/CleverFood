import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from '@chakra-ui/react';

import { recipe } from '~/store/recipe/recipe.types';

import BsAlarm from '../../assets/BsAlarm.svg?react';
import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import CardStat from '../CardStat';
import CategoriesTags from '../CategoriesTags';
import CustomImage from '../UI/CustomImage/CustomImage';

type Props = {
    item: recipe;
};

function RecipeDescription(props: Props) {
    return (
        <Flex mt={{ base: 4, lg: 14 }} direction={{ base: 'column', md: 'row' }}>
            <Box
                maxW={{ base: '328px', md: '232px', lg: '353px', xl: '553px' }}
                flexShrink={0}
                overflow='hidden'
                position='relative'
            >
                <CustomImage
                    src={props.item.image}
                    alt={props.item.title}
                    width='100%'
                    height='100%'
                    objectFit='cover'
                />
            </Box>

            <Flex
                pl={{ base: 0, md: 4, lg: 6 }}
                mt={{ base: 4, md: 0 }}
                direction='column'
                justifyContent='space-between'
                gap={{ base: 0, lg: 6 }}
                flex='1'
            >
                <Box>
                    <Flex justifyContent='space-between' alignItems='start'>
                        <CategoriesTags
                            subCategoriesIds={props.item.categoriesIds}
                            keyId='RecipeDescription'
                            color='lime.50'
                        />
                        <CardStat bookmarks={props.item.bookmarks} like={props.item.likes} />
                    </Flex>
                    <Stack spacing={{ base: 4, md: 1 }} mt={8}>
                        <Text
                            fontSize={{ base: '2xl', lg: '5xl' }}
                            fontWeight='bold'
                            color='black'
                            w={{ base: '100%', md: '437px' }}
                        >
                            {props.item.title}
                        </Text>
                        <Text fontSize='sm' noOfLines={{ base: 3, lg: 3 }}>
                            {props.item.description}
                        </Text>
                    </Stack>
                </Box>
                <Flex
                    justifyContent='space-between'
                    alignItems={{ base: 'start', md: 'end' }}
                    direction={{ base: 'column', md: 'row' }}
                    gap={3}
                    mt={{ base: 6, lg: 0 }}
                >
                    <Tag size='xs' py='3px' px={2}>
                        <TagLeftIcon boxSize='16px' as={BsAlarm} />
                        <TagLabel>{props.item.time} минут</TagLabel>
                    </Tag>
                    <HStack spacing={{ base: 3, lg: 4 }}>
                        <Button
                            size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                            variant='outline'
                            colorScheme='black'
                            color='blackAlpha.600'
                            leftIcon={<Icon as={Like} color='blackAlpha.800' />}
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                            bg='lime.400'
                            leftIcon={<Icon as={Bookmark} color='blackAlpha.800' />}
                        >
                            Сохранить в закладки
                        </Button>
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default RecipeDescription;
