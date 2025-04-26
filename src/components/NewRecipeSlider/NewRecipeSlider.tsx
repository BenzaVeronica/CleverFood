// import 'swiper/css';
import 'swiper/swiper-bundle.css';

import { Box, Icon, IconButton, Text } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MAS_RECIPES } from '~/store/recipe/recipe.constants';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg?react';
import CardVertical from '../Card/CardVertical';

type Props = {
    // title?: string;
};

function NewRecipeSlider(_props: Props) {
    // const list = sortByNewest(MAS_RECIPES).slice(0, 10);
    // const list = useMemo(() => sortByField(MAS_RECIPES, 'date', 'asc').slice(0, 10), [MAS_RECIPES]);
    const list = useMemo(() => MAS_RECIPES.slice(0, 10), []);

    const sliderRef = useRef<SwiperType | null>(null);
    const next = () => {
        sliderRef.current?.slideNext();
    };

    const prev = () => {
        sliderRef.current?.slidePrev();
    };
    return (
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
                    // slidesPerView={2}
                    slidesPerView='auto'
                    onSwiper={(swiper) => (sliderRef.current = swiper)}
                    grabCursor={true}
                    // speed={200}
                    // breakpoints={{
                    //     320: {
                    //         slidesPerView: 2.1,
                    //         spaceBetween: 12,
                    //     },
                    //     768: {
                    //         slidesPerView: 4.5,
                    //         spaceBetween: 12,
                    //     },
                    //     1440: {
                    //         slidesPerView: 3.1,
                    //         spaceBetween: 12,
                    //     },
                    //     1920: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 24,
                    //     },
                    // }}
                >
                    {list.map((recipe, i) => (
                        <SwiperSlide
                            key={`new-recipe-${recipe.id}`}
                            style={{ width: 'auto', height: 'initial' }}
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
    );
}

export default NewRecipeSlider;
