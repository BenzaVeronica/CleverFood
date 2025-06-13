import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormLabel,
    IconButton,
    InputGroup,
    InputProps,
    InputRightElement,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { ACCESSIBILITY } from '~/app/accessibility.constants';
import { TEST_ID } from '~/test/test.constant';

import CustomFormInput from '../CustomFormInput';

type FormFieldProps<T extends FieldValues> = InputProps & {
    label: string;
    type: string;
    name: Path<T>;
    register?: UseFormRegister<T>;
    trigger?: (name: Path<T>) => Promise<boolean>;
    onFieldChange?: (name: Path<T>) => void;
    infoText?: string;
    errors?: FieldErrors<T>;
    isRequired?: boolean;
    placeholder?: string;
    mb?: string | number;
    dataTestId?: string;
    showVisibilityToggle?: boolean;
};

export function CustomFormField<T extends FieldValues>({
    label,
    name,
    type,
    errors,
    isRequired = false,
    register,
    trigger,
    onFieldChange,
    mb = 6,
    showVisibilityToggle,
    placeholder,
    dataTestId,
    infoText,
    ...inputProps
}: FormFieldProps<T>) {
    const [showPassword, setShowPassword] = useState(false);

    const showPsw = () => setShowPassword(true);
    const hidePsw = () => setShowPassword(false);

    const handleChange = async (e: React.FocusEvent<HTMLInputElement>) => {
        inputProps.onChange?.(e);
        onFieldChange?.(name);
    };
    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        if (type !== 'password') {
            e.target.value = e.target.value.trim();
        }
        inputProps.onBlur?.(e);
    };
    const fieldError = errors?.[name] as FieldError | undefined;
    const accessibilityPsw = showPassword
        ? ACCESSIBILITY.forms.psw_hide
        : ACCESSIBILITY.forms.psw_show;

    return (
        <FormControl mb={mb} isInvalid={!!fieldError} isRequired={isRequired}>
            <FormLabel htmlFor={name} mb={1}>
                {label}
            </FormLabel>
            <InputGroup>
                <CustomFormInput
                    dataTestId={dataTestId}
                    size='lg'
                    id={name}
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder || label}
                    {...(register
                        ? register(name, {
                              onChange: handleChange,
                              onBlur: handleBlur,
                          })
                        : {})}
                    {...inputProps}
                />
                {showVisibilityToggle && (
                    <InputRightElement w={12} h={12}>
                        <IconButton
                            data-test-id={TEST_ID.Button.PasswordVisibility}
                            aria-label={accessibilityPsw}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            variant='ghost'
                            onMouseDown={showPsw}
                            onMouseUp={hidePsw}
                            onMouseLeave={hidePsw}
                            onTouchStart={showPsw}
                            onTouchEnd={hidePsw}
                        />
                    </InputRightElement>
                )}
            </InputGroup>
            {infoText && !fieldError && (
                <Text color='blackAlpha.700' fontSize='xs' mt={1} textAlign='left'>
                    {infoText}
                </Text>
            )}
            {fieldError && (
                <Text color='red.500' fontSize='xs' mt={1} textAlign='left'>
                    {fieldError.message}
                </Text>
            )}
        </FormControl>
    );
}
