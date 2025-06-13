import { Button, Flex, FlexProps, Icon, Image, Text, VStack } from '@chakra-ui/react';

import OkIcon from '~/assets/ok-filled.svg?react';
import ImageRecomendation from '~/assets/recomendation-banner.png';

import CardStat from '../CardStat';

type Props = {
    // keyId: string;
    flexProp?: FlexProps;
};

export function RecomendationBanner({ flexProp }: Props) {
    return (
        <Flex
            justifyContent='space-between'
            bg='lime.150'
            borderRadius='16px'
            px={8}
            py={6}
            {...flexProp}
        >
            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                justifyContent={{ base: 'center', md: 'start' }}
                alignItems={{ base: 'center', lg: 'start' }}
                gap={8}
            >
                <Image
                    boxSize={{ base: '108px', lg: '206px' }}
                    src={ImageRecomendation}
                    mixBlendMode='multiply'
                />
                <VStack
                    spacing={{ base: 3, md: 6 }}
                    w={{ base: 'full', md: '384px', lg: 'full', xl: '580px' }}
                >
                    <Text
                        fontSize={{ base: 'xl', lg: '4xl' }}
                        lineHeight={{ base: '28px', lg: '40px' }}
                        fontWeight={600}
                        pr={{ base: 0, xl: '44px' }}
                    >
                        Теперь вы можете рекомендовать рецепты других авторов
                    </Text>
                    <Flex
                        flexDirection={{ base: 'column', xl: 'row' }}
                        gap={2}
                        alignItems={{ base: 'start', xl: 'center' }}
                        w='full'
                    >
                        <Text fontSize='md' fontWeight={500}>
                            Это можно будет сделать с помощью кнопки
                        </Text>
                        <Button
                            variant='btnMain'
                            size='sm'
                            leftIcon={<Icon as={OkIcon} filter='invert(1)' />}
                        >
                            Рекомендовать рецепт
                        </Button>
                    </Flex>
                </VStack>
            </Flex>
            <CardStat bookmarks={251} subscribes={102} />
        </Flex>
    );
}
