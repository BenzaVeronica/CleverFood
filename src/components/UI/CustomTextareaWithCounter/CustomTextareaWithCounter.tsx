import { Box, Textarea } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

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
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textareaRef.current && counterRef.current) {
            const counterHeight = counterRef.current.offsetHeight;
            textareaRef.current.style.height = counterHeight + 16 + 'px';
        }
    }, [value]);

    return (
        <Box position='relative' width='100%'>
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                    // if (e.target.value.length <= maxLength)
                    onChange(e);
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
                ref={counterRef}
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
                    <Box as='span' color={value.length > maxLength ? 'red' : 'gray'}>
                        {` (${maxLength - value.length})`}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
