import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react';

type OptionType = {
    id: string;
    label: string;
};

type CustomSelectProps = {
    value: string;
    handleChange: (value: string) => void;
    options: OptionType[];
    placeholder?: string;
    disabledItems?: string[];
    dataTestId?: string;
    hasError: boolean;
} & ChakraSelectProps;

const CustomSelect = ({
    value,
    handleChange,
    options,
    placeholder = 'Выберите...',
    disabledItems = [],
    dataTestId,
    hasError,
    ...rest
}: CustomSelectProps) => (
    <ChakraSelect
        data-test-id={dataTestId && dataTestId}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        borderColor={hasError ? 'red.500' : 'blackAlpha.200'}
        borderWidth={hasError ? '2px' : '1px'}
        color='blackAlpha.700'
        bg='white'
        _hover={{ borderColor: 'blackAlpha.300' }}
        _focus={{ borderColor: 'lime.300', boxShadow: 'none' }}
        {...rest}
    >
        {options.map((option) => (
            <option key={option.id} value={option.id} disabled={disabledItems.includes(option.id)}>
                {option.label}
            </option>
        ))}
    </ChakraSelect>
);

export default CustomSelect;
