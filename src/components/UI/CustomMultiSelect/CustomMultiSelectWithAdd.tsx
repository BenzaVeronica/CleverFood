import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    IconButton,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuList as ChakraMenuList,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { FilterOptionType } from '~/components/DrawerFilter/DrawerFilter.constants';

import CustomAddBox from './CustomAddBox';

type Props = {
    value: string[];
    onChange: (value: string[]) => void;
    options: FilterOptionType[];
    placeholder?: string;
    isDisabled?: boolean;
    dataTestId?: string;
    isFilterDataTestId: boolean;
};

const CustomMultiSelectWithAdd = ({
    value: selectedOptions = [],
    onChange,
    options: initialOptions,
    placeholder = 'Выберите из списка...',
    isDisabled,
    dataTestId,
    isFilterDataTestId,
}: Props) => {
    const [options, setOptions] = useState<FilterOptionType[]>(initialOptions);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClear = (): void => {
        onChange([]);
    };

    const toggleOption = (option: FilterOptionType) => {
        const isSelected = selectedOptions.includes(option.label);
        const newValue = isSelected
            ? selectedOptions.filter((label) => label !== option.label)
            : [...selectedOptions, option.label];

        onChange(newValue);
    };

    return (
        <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <InputGroup>
                <MenuButton
                    data-test-id={dataTestId && dataTestId}
                    as={Button}
                    rightIcon={
                        isOpen ? (
                            <ChevronUpIcon boxSize='18px' />
                        ) : (
                            <ChevronDownIcon boxSize='18px' />
                        )
                    }
                    w='100%'
                    textAlign='left'
                    fontWeight='normal'
                    variant='outline'
                    isDisabled={isDisabled}
                >
                    {selectedOptions.length > 0 ? (
                        <Flex
                            gap={1}
                            flexWrap='wrap'
                            maxW='100%'
                            maxH={{ base: 8, md: 10 }}
                            overflowY='hidden'
                        >
                            {selectedOptions.map((el, index) => (
                                <Flex
                                    key={index}
                                    borderColor='lime.300'
                                    borderRadius='6px'
                                    borderWidth='1px'
                                    alignItems='center'
                                >
                                    <Text color='lime.600' px={2} py='2px'>
                                        {/* {el.label} */}
                                        {el}
                                    </Text>
                                </Flex>
                            ))}
                        </Flex>
                    ) : (
                        placeholder
                    )}
                </MenuButton>
                {selectedOptions.length > 0 && (
                    <InputRightElement>
                        <IconButton
                            aria-label='clear'
                            icon={<CloseIcon boxSize='10px' />}
                            size='md'
                            variant='ghost'
                            position='absolute'
                            right={8}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClear();
                            }}
                        />
                    </InputRightElement>
                )}
            </InputGroup>
            <ChakraMenuList
                data-test-id='allergens-menu'
                maxH='500px'
                zIndex={10}
                display='flex'
                flexDirection='column'
                py={0}
            >
                <Box flex='1' overflowY='auto' layerStyle='customScroll'>
                    {options.map((option, index) => (
                        <Flex
                            key={option.id}
                            px={4}
                            bg={index % 2 === 1 ? 'white' : 'blackAlpha.100'}
                            _hover={{ bg: 'blackAlpha.200' }}
                            justifyContent='flex-start'
                            cursor='pointer'
                            py={2}
                        >
                            <Checkbox
                                data-test-id={isFilterDataTestId ? `allergen-${index}` : ''}
                                isChecked={selectedOptions.includes(option.label)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    toggleOption(option);
                                }}
                                fontSize='sm'
                                color='gray.800'
                                mr={2}
                                isFocusable={false}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {option.label}
                            </Checkbox>
                        </Flex>
                    ))}
                </Box>

                <CustomAddBox
                    isFilterDataTestId={isFilterDataTestId}
                    options={options}
                    setOptions={setOptions}
                    selectedOptions={selectedOptions}
                    toggleOption={toggleOption}
                />
            </ChakraMenuList>
        </Menu>
    );
};

export default CustomMultiSelectWithAdd;
