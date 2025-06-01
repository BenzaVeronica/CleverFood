export const themeInput = {
    gray: {
        field: {
            bg: 'white',
            border: '1px solid',
            borderColor: 'blackAlpha.200',
            borderRadius: 'md',
            _hover: {
                borderColor: 'gray.300',
            },
            _placeholder: {
                color: 'blackAlpha.700',
            },
            _focus: {
                borderColor: 'lime.500',
                boxShadow: '0 0 0 1px lime.500',
            },
            _invalid: {
                borderColor: 'red.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-red-500)',
            },
        },
    },
};
