import 'swiper/swiper-bundle.css';

import { Box, Icon, IconButton, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetRecipesQuery } from '~/query/recipe/recipe.api';
import { SLIDER_PARAMS } from '~/query/recipe/recipe.constants';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg?react';
import CardVertical from '../Card/CardVertical';
import WithLoadingError from '../WithLoadingError';

function NewRecipeSlider() {
    const { data, isLoading, isError } = useGetRecipesQuery(SLIDER_PARAMS);

    const sliderRef = useRef<SwiperType | null>(null);
    const next = () => {
        sliderRef.current?.slideNext();
    };
    const prev = () => {
        sliderRef.current?.slidePrev();
    };

    return (
        <WithLoadingError isLoading={isLoading} isError={isError} isExist={!!data?.data.length}>
            <Box position='relative' as='section' mt={{ base: 0, lg: 6 }} mb={{ base: 8, lg: 10 }}>
                <Text
                    as='h2'
                    fontSize={{ base: '2xl', lg: '4xl', xl: '4xl' }}
                    fontWeight='500'
                    mb={{ base: 3, lg: 6 }}
                >
                    Новые рецепты
                </Text>

                <Box w={{ base: 'calc(100% + 15px)', md: 'auto' }}>
                    <IconButton
                        data-test-id='carousel-back'
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
                        zIndex={3}
                        display={{ base: 'none', lg: 'flex' }}
                    />
                    <Swiper
                        data-test-id='carousel'
                        modules={[Navigation]}
                        loop={true}
                        spaceBetween={12}
                        slidesPerView='auto'
                        onSwiper={(swiper) => (sliderRef.current = swiper)}
                        grabCursor={true}
                        speed={0}
                    >
                        {data?.data.map((recipe, i) => (
                            <SwiperSlide
                                key={`new-recipe-${recipe._id}`}
                                style={{ width: 'auto' }}
                                data-test-id={`carousel-card-${i}`}
                            >
                                <CardVertical el={recipe} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <IconButton
                        data-test-id='carousel-forward'
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
                        zIndex={3}
                        display={{ base: 'none', lg: 'flex' }}
                    />
                </Box>
            </Box>
        </WithLoadingError>
    );
}

export default NewRecipeSlider;
