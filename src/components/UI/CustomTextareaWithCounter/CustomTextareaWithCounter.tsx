import { Box, Textarea } from '@chakra-ui/react';
import { forwardRef } from 'react';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength?: number;
    placeholder?: string;
    isInvalid?: boolean;
};

export const CustomTextareaWithCounter = forwardRef<HTMLTextAreaElement, Props>(
    ({ value, onChange, placeholder, maxLength = 160, isInvalid }, ref) => {
        // const textareaRef = useRef<HTMLTextAreaElement>(null);
        // const counterRef = useRef<HTMLDivElement>(null);
        // useEffect(() => {
        //     if (textareaRef.current && counterRef.current) {
        //         const counterHeight = counterRef.current.offsetHeight;
        //         textareaRef.current.style.height = counterHeight + 16 + 'px';
        //     }
        // }, [value]);

        const counterRefCallback = (counterNode: HTMLDivElement | null) => {
            if (counterNode && typeof ref === 'object' && ref?.current) {
                const counterHeight = counterNode.offsetHeight;
                ref.current.style.height = counterHeight + 16 + 'px';
            }
        };
        return (
            <Box position='relative' width='100%'>
                <Textarea
                    ref={ref}
                    // ref={textareaRef}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                    }}
                    placeholder={placeholder}
                    resize='vertical'
                    color='transparent'
                    bg='transparent'
                    position='relative'
                    zIndex={2}
                    _placeholder={{ color: 'gray.400' }}
                    borderColor={isInvalid ? 'red.500' : 'gray.200'}
                    sx={{
                        caretColor: 'black',
                        overflow: 'hidden',
                    }}
                />

                <Box
                    ref={counterRefCallback}
                    // ref={counterRef}
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
                        <Box as='span' color={value.length > maxLength ? 'red.500' : 'gray'}>
                            {` (${maxLength - value.length})`}
                        </Box>
                    )}
                </Box>
            </Box>
        );
    },
);
