import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';

type Props = InputProps & {
    dataTestId?: string;
};

export const CustomFormInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { dataTestId, ...rest } = props;
    return (
        <Input
            data-test-id={dataTestId}
            ref={ref}
            bg='white'
            color='lime.500'
            borderRadius='md'
            borderColor='lime.150'
            _placeholder={{ color: 'inherit' }}
            _focus={{
                borderColor: 'lime.500',
                boxShadow: '0 0 0 1px lime.500',
            }}
            _invalid={{
                borderColor: 'red.500',
                boxShadow: '0 0 0 1px red.500',
            }}
            {...rest}
        />
    );
});
