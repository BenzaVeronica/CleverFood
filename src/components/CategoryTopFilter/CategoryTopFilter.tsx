import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
} from '@chakra-ui/react';

import IconFilter from '../../assets/iconfilter.svg?react';
import IconSearch from '../../assets/IconSearch.svg?react';

type Props = {
    title: string;
    text?: string;
    // list: item;
};

function CategoryTopFilter({ title, text }: Props) {
    return (
        <Box mb={8}>
            <Text textAlign='center' textStyle='h1' as='h1' mt={{ base: 4, lg: 8 }}>
                {title}
            </Text>
            <Text
                marginX='auto'
                textAlign='center'
                textStyle='main'
                color='blackAlpha.600'
                as='p'
                mt={3}
                maxW='690px'
            >
                {text}
            </Text>

            <Flex gap={3} mt={{ base: 4, lg: 8 }} maxW='520px' marginX='auto'>
                <IconButton
                    variant='outline'
                    aria-label='Фильтр'
                    // size='lg'
                    // w={{ base: 8, lg: 12 }}
                    // h={{ base: 8, lg: 12 }}
                    // size={{ base: 'sm', lg: "lg" }}
                    size={{ base: '32px', lg: '48px' }}
                    p={{ base: 2, lg: '11px' }}
                    icon={<Icon as={IconFilter} boxSize={{ base: '14px', lg: '24px' }} />}
                />
                <InputGroup>
                    <Input
                        size={{ base: 'sm', lg: 'lg' }}
                        placeholder='Название или ингредиент...'
                        _placeholder={{
                            color: 'lime.800',
                        }}
                    />
                    <InputRightElement w={{ base: 8, lg: 12 }} h={{ base: 8, lg: 12 }}>
                        <Icon as={IconSearch} w={{ base: 6, lg: 10 }} h={{ base: 6, lg: 10 }} />
                    </InputRightElement>
                </InputGroup>
            </Flex>
            {/* <Button rightIcon={<IconSearch />} variant='outline'>
</Button> */}
            <Flex
                mt={4}
                maxW='520px'
                marginX='auto'
                gap={4}
                alignItems='center'
                display={{ base: 'none', lg: 'flex' }}
            >
                <FormControl
                    display='flex'
                    alignItems='center'
                    gap={3}
                    // w={'100%'}
                >
                    <FormLabel
                        htmlFor='allergens-alerts'
                        m='0'
                        fontSize='md'
                        fontWeight={500}
                        w='100%'
                        //  flex='1'
                        // flexShrink={0}
                    >
                        Исключить мои аллергены
                    </FormLabel>
                    <Switch id='allergens-alerts' colorScheme='lime' />
                </FormControl>
                <Select
                    // maxW={'234px'}
                    w='90%'
                    color='blackAlpha.700'
                    borderColor='blackAlpha.200'
                    size='md'
                    placeholder='Выберите из списка...'
                    _placeholder={{
                        color: 'rgba(0, 0, 0, 0.2)',
                        fontSize: 'md',
                    }}
                    sx={{
                        '& option': {
                            fontSize: 'md !important',
                        },
                    }}
                >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Flex>
        </Box>
    );
}

export default CategoryTopFilter;
