import { Box, Textarea } from '@chakra-ui/react';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
    placeholder?: string;
};

export function CustomTextareaWithCounter({
    value,
    onChange,
    placeholder,
    maxLength = 160,
}: Props) {
    return (
        <Box position='relative' width='100%'>
            <Textarea
                value={value}
                onChange={(e) => {
                    if (e.target.value.length <= maxLength) {
                        onChange(e);
                    }
                }}
                placeholder={placeholder}
                resize='vertical'
                color='transparent'
                bg='transparent'
                position='relative'
                zIndex={2}
                _placeholder={{ color: 'gray.400' }}
                sx={{
                    caretColor: 'black',
                    overflow: 'hidden',
                }}
            />

            <Box
                position='absolute'
                top='8px'
                left='16px'
                right='16px'
                whiteSpace='pre-wrap'
                wordBreak='break-word'
                color='black'
                pointerEvents='none'
                fontSize='md'
                lineHeight='1.5'
                zIndex={1}
            >
                {value}
                {value && (
                    <Box as='span' color={value.length === maxLength ? 'red' : 'gray'}>
                        {` (${maxLength - value.length})`}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
