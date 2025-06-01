import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Stack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { isServerError } from '~/query/errors/error.utils';
import { useDeleteRecipeMutation } from '~/query/recipe/recipe.api';
import { CustomErrorResponse } from '~/query/types';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';
import { useAppDispatch } from '~/store/hooks';
import { Recipe } from '~/store/recipe-filter/recipe.types';
import { useLikeAndBookmark } from '~/store/recipe-filter/useLikeAndBookmark';
import { TEST_ID } from '~/test/test.constant';
import { addError, addSuccess } from '~/widgets/error/error-slice';

import BsAlarm from '../../assets/BsAlarm.svg?react';
import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import CardStat from '../CardStat';
import CategoriesTags from '../CategoriesTags';
import { IconPencil } from '../Icons/IconPencil';
import { IconTrash } from '../Icons/Trash';
import { CustomImage } from '../UI/CustomImage/CustomImage';

type Props = {
    item: Recipe;
};

function RecipeDescription(props: Props) {
    const { recipeId } = useParams();

    // const { toggleLike, toggleBookmark } = useLikeAndBookmark(props.item);
    const { toggleLike, toggleBookmark } = useLikeAndBookmark(recipeId);
    const { user } = useAuth();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const handleDeleteRecipe = async () => {
        if (!recipeId) return;
        try {
            await deleteRecipe(recipeId).unwrap();
            dispatch(addSuccess(TOAST_MESSAGE.RecipeDelete[200]));
            navigate('/');
        } catch (error) {
            const err = error as CustomErrorResponse;
            if (isServerError(err.status)) {
                dispatch(addError(TOAST_MESSAGE.RecipeDelete[500]));
            }
        }
    };

    const handleEditRecipe = () => {
        navigate(`${PageRoutes.RECIPE_EDIT}${window.location.pathname}`);
    };

    const isMy = user?.userId !== props.item.authorId;

    if (!recipeId) return;
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
                        <TagLabel fontSize='14px'>{props.item.time} минут</TagLabel>
                    </Tag>
                    <HStack spacing={{ base: 3, lg: 4 }}>
                        {isMy ? (
                            <>
                                <Button
                                    onClick={toggleLike}
                                    size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                    variant='outline'
                                    colorScheme='black'
                                    color='blackAlpha.600'
                                    leftIcon={<Icon as={Like} color='blackAlpha.800' />}
                                >
                                    Оценить рецепт
                                </Button>
                                <Button
                                    onClick={toggleBookmark}
                                    size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                    bg='lime.400'
                                    leftIcon={<Icon as={Bookmark} color='blackAlpha.800' />}
                                >
                                    Сохранить в закладки
                                </Button>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    data-test-id={TEST_ID.Recipe.DeleteButton}
                                    aria-label='Удалить рецепт'
                                    variant='ghost'
                                    icon={<IconTrash color='black' />}
                                    onClick={handleDeleteRecipe}
                                />
                                <Button
                                    onClick={handleEditRecipe}
                                    size={{ base: 'xs', lg: 'sm', xl: 'lg' }}
                                    variant='btnOutlineBlack'
                                    leftIcon={<IconPencil fill='black' />}
                                >
                                    Редактировать рецепт
                                </Button>
                            </>
                        )}
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default RecipeDescription;
