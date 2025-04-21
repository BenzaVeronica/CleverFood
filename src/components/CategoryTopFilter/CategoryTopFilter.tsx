import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    IconButton,
    Select,
    Switch,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

import IconFilter from '../../assets/iconfilter.svg?react';
import DrawerFilter from '../DrawerFilter';
import SearchBox from './SearchBox';

type Props = {
    title: string;
    text?: string;
    // list: item;
};

function CategoryTopFilter({ title, text }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // data-test-id={`food-card-${i}`}
    const boxRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        if (boxRef.current) {
            boxRef.current.style.boxShadow = 'var(--chakra-shadows-xl)';
        }
    };

    const handleBlur = () => {
        if (boxRef.current) {
            boxRef.current.style.boxShadow = 'none';
        }
    };

    return (
        <Box
            ref={boxRef}
            boxShadow='none'
            // boxShadow='xl'
            borderRadius='0 0 24px 24px'
            w={{ base: '360px', xs: '480px', md: '578px', xl: '898px' }}
            pb={8}
        >
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
                w={{ base: '298px', md: '727px', lg: '898px' }}
                noOfLines={4}
            >
                {text}
            </Text>
            <DrawerFilter isOpen={isOpen} onClose={onClose} />
            <Flex
                gap={3}
                mt={{ base: 4, lg: 8 }}
                maxW='520px'
                marginX='auto'
                w={{ base: '328px', md: 'auto' }}
            >
                <IconButton
                    data-test-id='filter-button'
                    variant='outline'
                    aria-label='Фильтр'
                    // size='lg'
                    // w={{ base: 8, lg: 12 }}
                    // h={{ base: 8, lg: 12 }}
                    // size={{ base: 'sm', lg: "lg" }}
                    size={{ base: '32px', lg: '48px' }}
                    p={{ base: 2, lg: '11px' }}
                    icon={<Icon as={IconFilter} boxSize={{ base: '14px', lg: '24px' }} />}
                    onClick={onOpen}
                />
                <SearchBox onFocus={handleFocus} onBlur={handleBlur} />
            </Flex>
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
