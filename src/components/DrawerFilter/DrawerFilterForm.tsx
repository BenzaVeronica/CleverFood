import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    Text,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { useAppDispatch } from '~/store/hooks';
import { resetFilters, setAllFilter } from '~/store/recipe/recipe-filter-slice';

import BsFillXCircleFill from '../../assets/BsFillXCircleFill.svg?react';
import { filterConfig } from './DrawerFilter.config';
import DrawerFilterFields from './DrawerFilterFields';
import SelectedTags from './SelectedTags';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    // item: blogItem;
};

export type FormValues = {
    categories: string[];
    author: string[];
    meatTypes: string[];
    sideDishes: string[];
    allergens: string[];
};
function DrawerFilterForm(props: Props) {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const btnRef = useRef();
    const { categoryId } = useParams();

    const {
        // register,
        handleSubmit,
        control,
        reset,
        // formState: { errors },
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            categories: categoryId ? [categoryId] : [],
            author: [],
            meatTypes: [],
            sideDishes: [],
            allergens: [],
        },
    });
    const selectedValuesMap = {
        categories: watch('categories') || [],
        meatTypes: watch('meatTypes') || [],
        sideDishes: watch('sideDishes') || [],
        allergens: watch('allergens') || [],
        author: watch('author') || [],
    };

    const dispatch = useAppDispatch();
    const handleFormSubmit = (data: FormValues) => {
        // console.log(data);
        props.onClose();
        dispatch(setAllFilter(data));
    };
    const handleClear = () => {
        reset();
        dispatch(resetFilters());
    };

    const createRemoveHandlers = useMemo(() => {
        const handlers: Partial<Record<keyof FormValues, (labelToRemove: string) => void>> = {};
        (Object.keys(filterConfig) as Array<keyof FormValues>).forEach((type) => {
            handlers[type] = (labelToRemove: string) => {
                const valueToRemove = filterConfig[type].find(
                    (option) => option.label === labelToRemove,
                )?.id;

                if (valueToRemove) {
                    setValue(
                        type,
                        watch(type)?.filter((value) => value !== valueToRemove),
                    );
                }
            };
        });

        return handlers;
    }, [setValue, watch]);

    return (
        <Drawer
            isOpen={props.isOpen}
            placement='right'
            onClose={props.onClose}
            size='md'
            // size={{base: 'sm', lg: 'md'}}
            // finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DrawerContent
                    bg='white'
                    w={{ base: '344px', lg: '453px' }}
                    data-test-id='filter-drawer'
                    // justifyContent="space-between"
                >
                    <DrawerHeader
                        p={{ base: 4, lg: 8 }}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Text fontSize='2xl'>Фильтр</Text>
                        <Icon
                            as={BsFillXCircleFill}
                            boxSize={6}
                            onClick={props.onClose}
                            data-test-id='close-filter-drawer'
                        />
                    </DrawerHeader>

                    <DrawerBody
                        px={{ base: 4, lg: 8 }}
                        pt={{ base: 4, lg: 2 }}
                        pb={{ base: 4, lg: 0 }}
                        flex={1}
                        layerStyle='customScroll'
                    >
                        <DrawerFilterFields control={control} categoryId={categoryId} />
                    </DrawerBody>

                    <DrawerFooter display='flex' flexDirection='column' alignItems='start' gap={3}>
                        <SelectedTags
                            selectedValuesMap={selectedValuesMap}
                            removeHandlers={createRemoveHandlers}
                            // removeHandlers={removeHandlers}
                        />
                        <Box alignSelf='end'>
                            <Button
                                data-test-id='clear-filter-button'
                                size={{ base: 'sm', lg: 'lg' }}
                                variant='outline'
                                colorScheme='black'
                                onClick={handleClear}
                            >
                                Очистить фильтр
                            </Button>
                            <Button
                                data-test-id='find-recipe-button'
                                size={{ base: 'sm', lg: 'lg' }}
                                colorScheme='black'
                                ml={2}
                                type='submit'
                                isDisabled={!isDirty}
                                pointerEvents={!isDirty ? 'none' : 'auto'}
                            >
                                Найти рецепт
                            </Button>
                        </Box>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
    );
}

export default DrawerFilterForm;
