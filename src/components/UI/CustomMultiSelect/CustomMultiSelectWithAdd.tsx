import { AddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList as ChakraMenuList,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

type Option = {
    value: string;
    label: string;
};

type Props = {
    selectedOptions: Option[];
    options: Option[];
};

const CustomMultiSelectWithAdd = (_props: Props) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [customAllergen, setCustomAllergen] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const options: Option[] = [
        { value: 'peanuts', label: 'Арахис' },
        { value: 'milk', label: 'Молоко' },
        { value: 'eggs', label: 'Яйца' },
    ];

    const handleAddCustom = (): void => {
        if (!customAllergen.trim()) return;
        const newOption: Option = {
            value: customAllergen.toLowerCase().replace(/\s+/g, '_'),
            label: customAllergen,
        };
        setSelectedOptions([...selectedOptions, newOption]);
        setCustomAllergen('');
    };

    const toggleOption = (option: Option): void => {
        if (selectedOptions.some((o) => o.value === option.value)) {
            setSelectedOptions(selectedOptions.filter((o) => o.value !== option.value));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <MenuButton
                as={Button}
                rightIcon={<AddIcon />}
                w='100%'
                textAlign='left'
                fontWeight='normal'
                variant='outline'
            >
                {selectedOptions.length > 0
                    ? selectedOptions.map((o) => o.label).join(', ')
                    : 'Выберите аллергены...'}
            </MenuButton>
            <ChakraMenuList maxH='300px' overflowY='auto'>
                <Stack spacing={1} p={2}>
                    {options.map((option) => (
                        <MenuItem
                            key={option.value}
                            closeOnSelect={false}
                            onClick={(e) => e.preventDefault()}
                        >
                            <Checkbox
                                isChecked={selectedOptions.some((o) => o.value === option.value)}
                                onChange={() => toggleOption(option)}
                                mr={2}
                            />
                            <Text>{option.label}</Text>
                        </MenuItem>
                    ))}
                </Stack>

                <Box p={2}>
                    <InputGroup size='sm'>
                        <Input
                            value={customAllergen}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setCustomAllergen(e.target.value)
                            }
                            placeholder='Введите аллерген...'
                            onKeyPress={(e: React.KeyboardEvent) =>
                                e.key === 'Enter' && handleAddCustom()
                            }
                        />
                        <InputRightElement width='4.5rem'>
                            <Button
                                h='1.75rem'
                                size='sm'
                                onClick={handleAddCustom}
                                isDisabled={!customAllergen.trim()}
                            >
                                Добавить
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </ChakraMenuList>
        </Menu>
    );
};

export default CustomMultiSelectWithAdd;
