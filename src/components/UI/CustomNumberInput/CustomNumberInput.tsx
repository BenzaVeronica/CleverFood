import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

type CustomNumberInputProps = {
    label: string;
    value: string | number | null;
    onChange: (val: string | number | null) => void;
    isInvalid?: boolean;
    width?: string;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    placeholder?: string;
    dataTestId?: string;
};

export const CustomNumberInput = ({
    label,
    isInvalid,
    width = '90px',
    min,
    max,
    step,
    precision = 0,
    placeholder,
    value,
    onChange,
    dataTestId,
}: CustomNumberInputProps) => {
    const handleNumberInputChange = (valueStr: string) => {
        if (valueStr === '') {
            onChange(null);
        } else if (valueStr === '-') {
            onChange(valueStr);
        } else {
            const num = parseFloat(valueStr);
            if (!isNaN(num)) {
                onChange(num);
            } else {
                onChange(null);
            }
        }
    };

    return (
        <FormControl
            isInvalid={isInvalid}
            display='flex'
            alignItems='center'
            justifyContent='start'
        >
            <FormLabel variant='main' whiteSpace='nowrap' mr={2}>
                {label}
            </FormLabel>
            <NumberInput
                min={min}
                max={max}
                step={step}
                precision={precision}
                w={width}
                value={value ?? ''}
                onChange={(valueStr) => handleNumberInputChange(valueStr)}
                onKeyDown={(e) => {
                    if (e.key === '-') e.stopPropagation();
                }}
            >
                <NumberInputField placeholder={placeholder} data-test-id={dataTestId} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    );
};
