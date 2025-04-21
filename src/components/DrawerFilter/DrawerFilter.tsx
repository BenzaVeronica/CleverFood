import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Icon,
    Select,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import BsFillXCircleFill from '../../assets/BsFillXCircleFill.svg?react';
import Checkboxes from '../UI/Checkboxes';
import CustomMultiSelect from '../UI/CustomMultiSelect/CustomMultiSelect';
import {
    filterAuthor,
    filterCategory,
    filterMeatTypes,
    filterSideDish,
} from './DrawerFilter.constants';
import SelectedTags from './SelectedTags';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    // item: blogItem;
};

type FormValues = {
    category?: string[];
    author?: string[];
    meatTypes: string[];
    sideDishes: string[];
    excludeAllergens: boolean;
    allergens?: string[];
};
function DrawerFilter(props: Props) {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const btnRef = useRef();
    const {
        // register,
        handleSubmit,
        control,
        reset,
        // formState: { errors },
        watch,
        setValue,
    } = useForm<FormValues>({
        defaultValues: {
            meatTypes: [],
            sideDishes: [],
            excludeAllergens: false,
        },
    });
    const handleFormSubmit = (data: FormValues) => {
        // onSubmit(data);
        console.log(data);

        props.onClose();
    };

    const handleClear = () => {
        reset();
    };

    const selectedMeatValues = watch('meatTypes') || [];

    const selectedMeatLabels = selectedMeatValues.map((value) => {
        const option = filterMeatTypes.find((opt) => opt.id === value);
        return option ? option.label : value;
    });
    const removeMeatType = (labelToRemove: string) => {
        const valueToRemove = filterMeatTypes.find((option) => option.label === labelToRemove)?.id;

        if (valueToRemove) {
            setValue(
                'meatTypes',
                selectedMeatValues.filter((value) => value !== valueToRemove),
            );
        }
    };
    const selectedSideDishValues = watch('sideDishes') || [];
    const selectedSideDishLabels = selectedSideDishValues.map((value) => {
        const option = filterSideDish.find((opt) => opt.id === value);
        return option ? option.label : value;
    });
    const removeSideDish = (labelToRemove: string) => {
        const valueToRemove = filterSideDish.find((option) => option.label === labelToRemove)?.id;

        if (valueToRemove) {
            setValue(
                'sideDishes',
                selectedMeatValues.filter((value) => value !== valueToRemove),
            );
        }
    };

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
                    >
                        <Stack spacing={{ base: 4, lg: 6 }}>
                            {/* <CustomMultiSelect /> */}
                            {/* <Select
                            color='blackAlpha.700'
                            borderColor='blackAlpha.200'
                            size='md'
                            placeholder='Категория'
                            _placeholder={{
                                color: 'rgba(0, 0, 0, 0.2)',
                                fontSize: 'md',
                            }}
                            sx={{
                                '& option': {
                                    fontSize: 'md !important',
                                },
                            }}
                        >
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select> */}
                            <Controller
                                control={control}
                                name='category'
                                // defaultValue={[]}
                                render={({ field }) => (
                                    <CustomMultiSelect
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        options={filterCategory}
                                        placeholder='Категория'
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='author'
                                // defaultValue={[]}
                                render={({ field }) => (
                                    <CustomMultiSelect
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        options={filterAuthor}
                                        placeholder='Поиск по автору'
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='meatTypes'
                                render={({ field }) => (
                                    <Checkboxes
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        title='Тип мяса:'
                                        list={filterMeatTypes}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name='sideDishes'
                                render={({ field }) => (
                                    <Checkboxes
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        title='Тип гарнира:'
                                        list={filterSideDish}
                                    />
                                )}
                            />
                            {/* <Input mt={2} placeholder='Type here...' /> */}

                            <Stack spacing={2}>
                                <FormControl display='flex' alignItems='center' gap={3} w='233px'>
                                    <FormLabel
                                        htmlFor='allergens-alerts'
                                        m='0'
                                        ml={1}
                                        fontSize='md'
                                        fontWeight={500}
                                        color='black'
                                    >
                                        Исключить аллергены
                                    </FormLabel>
                                    <Switch id='allergens-alerts' colorScheme='lime' />
                                </FormControl>
                                <Select
                                    // maxW={'234px'}
                                    // {...register('category')}
                                    w='90%'
                                    color='blackAlpha.700'
                                    borderColor='blackAlpha.200'
                                    size='md'
                                    placeholder='Выберите из списка аллергенов...'
                                    _placeholder={{
                                        color: 'rgba(0, 0, 0, 0.2)',
                                        fontSize: 'md',
                                    }}
                                    sx={{
                                        '& option': {
                                            fontSize: 'md !important',
                                        },
                                    }}
                                >
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter display='flex' flexDirection='column' alignItems='start' gap={3}>
                        <SelectedTags
                            selectedMeatLabels={selectedMeatLabels}
                            removeMeatType={removeMeatType}
                            selectedSideDishLabels={selectedSideDishLabels}
                            removeSideDish={removeSideDish}
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

export default DrawerFilter;
