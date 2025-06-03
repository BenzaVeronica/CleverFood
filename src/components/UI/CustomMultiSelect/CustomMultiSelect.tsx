import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Button,
    ButtonProps,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList as ChakraMenuList,
    Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { FilterOptionType } from '~/components/DrawerFilter/DrawerFilter.constants';

type CustomMultiSelectProps = {
    value: string[];
    onChange: (value: string[]) => void;
    options: FilterOptionType[];
    placeholder?: string;
    disabledItems?: string[];
    dataTestId?: string;
    buttonProps?: ButtonProps;
    hasError?: boolean;
    maxLabelWidth?: number;
};

const MAX_LABEL_WIDTH = 100;
const GAP = 8;

const CustomMultiSelect = ({
    value = [],
    onChange,
    options,
    placeholder = 'Выберите...',
    disabledItems = [],
    dataTestId,
    buttonProps,
    hasError,
    maxLabelWidth = MAX_LABEL_WIDTH,
}: CustomMultiSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (optionValue: string): void => {
        if (disabledItems.includes(optionValue)) return;
        const newValue = value.includes(optionValue)
            ? value.filter((v) => v !== optionValue)
            : [...value, optionValue];
        onChange(newValue);
    };

    const selectedLabels = options
        .filter((option) => value.includes(option.id))
        .map((option) => option.label);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const containerWidth = entry.contentRect.width;
                const visibleCount = Math.floor((containerWidth + GAP) / (maxLabelWidth + GAP));
                setVisibleCount(visibleCount);
            }
        });
        observer.observe(containerRef.current);
        return () => {
            observer.disconnect();
        };
    }, [containerRef, maxLabelWidth]);

    const visibleLabels = selectedLabels.slice(0, visibleCount);
    const hiddenCount = selectedLabels.length - visibleCount;

    return (
        <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <MenuButton
                data-test-id={dataTestId && dataTestId}
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                color='blackAlpha.700'
                borderColor={hasError ? 'red.500' : 'blackAlpha.200'}
                borderWidth={hasError ? '2px' : '1px'}
                size='md'
                textAlign='left'
                fontWeight='normal'
                variant='outline'
                bg='white'
                _expanded={{ bg: 'white', borderColor: 'lime.300' }}
                height='auto'
                py='10px'
                maxH='48px'
                width='100%'
                ref={containerRef}
                {...buttonProps}
            >
                {selectedLabels.length > 0 ? (
                    <Flex gap={2} flexWrap='nowrap' maxW='100%' maxH='19px' overflow='hidden'>
                        {visibleLabels.map((el, index) => (
                            <Flex
                                key={index}
                                borderColor='lime.300'
                                borderRadius='6px'
                                borderWidth='1px'
                                alignItems='center'
                            >
                                <Text color='lime.600' px={2} py='2px'>
                                    {el}
                                </Text>
                            </Flex>
                        ))}
                        {hiddenCount > 0 && (
                            <Flex
                                borderColor='lime.300'
                                borderRadius='6px'
                                borderWidth='1px'
                                alignItems='center'
                                px={2}
                                py='2px'
                            >
                                <Text color='lime.600'>+{hiddenCount}</Text>
                            </Flex>
                        )}
                    </Flex>
                ) : (
                    placeholder
                )}
            </MenuButton>
            <ChakraMenuList maxH='300px' overflowY='auto' py={0} w='448px'>
                {options.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        closeOnSelect={false}
                        px={4}
                        bg={index % 2 === 1 ? 'white' : 'blackAlpha.100'}
                        _hover={{ bg: 'blackAlpha.200' }}
                        justifyContent='flex-start'
                    >
                        <Checkbox
                            data-test-id={option.id === 'vegan' && 'checkbox-веганская кухня'}
                            isChecked={value.includes(option.id)}
                            onChange={(e) => {
                                e.stopPropagation();
                                toggleOption(option.id);
                            }}
                            fontSize='sm'
                            color='gray.800'
                            mr={2}
                            isFocusable={false}
                        >
                            {option.label}
                        </Checkbox>
                    </MenuItem>
                ))}
            </ChakraMenuList>
        </Menu>
    );
};

export default CustomMultiSelect;
