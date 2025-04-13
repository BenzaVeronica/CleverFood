import { Box, Icon, IconButton, Text } from '@chakra-ui/react';

import { masItems } from '~/store/recipe/recipe.constants';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg?react';
import CardVertical from '../Card/CardVertical';

type Props = {
    // title?: string;
};

function NewRecipeSlider(_props: Props) {
    // const sliderRef = useRef(null);
    const next = () => {
        //   sliderRef.current?.slickNext();
    };

    const prev = () => {
        //   sliderRef.current?.slickPrev();
    };
    return (
        <Box
            as='section'
            mt={{ base: 0, lg: 6 }}
            mb={{ base: 8, lg: 10 }}
            w={{ base: 'calc(100% + 16px)', sm: 'calc(100% + 16px)', md: 'auto' }}
        >
            <Text
                as='h2'
                fontSize={{ base: '2xl', lg: '4xl', xl: '4xl' }}
                fontWeight='500'
                mb={{ base: 3, lg: 6 }}
            >
                Новые рецепты
            </Text>

            <Box position='relative'>
                <IconButton
                    aria-label='prev'
                    bg='black'
                    color='white'
                    _hover={{ bg: 'gray.800' }}
                    size='lg'
                    onClick={prev}
                    icon={<Icon as={ArrowLongRight} boxSize={6} transform='rotate(180deg)' />}
                    position='absolute'
                    left='-8px'
                    top='50%'
                    transform='translateY(-50%)'
                    zIndex={1}
                    display={{ base: 'none', lg: 'flex' }}
                />
                <Box display='flex' gap={{ base: 3, xl: 6 }} w='100%' overflowX='hidden'>
                    {masItems.slice(0, 7).map((el) => (
                        <CardVertical
                            el={el}
                            key={`CardList_CardHorizontal_${el.id}`}
                        ></CardVertical>
                    ))}
                </Box>
                <IconButton
                    aria-label='next'
                    bg='black'
                    color='white'
                    _hover={{ bg: 'gray.800' }}
                    size='lg'
                    onClick={next}
                    icon={<Icon as={ArrowLongRight} boxSize={6} />}
                    position='absolute'
                    right='-8px'
                    top='50%'
                    transform='translateY(-50%)'
                    zIndex={1}
                    display={{ base: 'none', lg: 'flex' }}
                />
            </Box>
        </Box>
    );
}

export default NewRecipeSlider;
