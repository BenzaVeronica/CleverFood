import { Box, Flex, Tag, Text } from '@chakra-ui/react';

import { RecipeStep } from '~/store/recipe-filter/recipe.types';

import { CustomImage } from '../UI/CustomImage/CustomImage';

type Props = {
    el: RecipeStep;
    isLast: boolean;
};

function RecipeStepCard(props: Props) {
    return (
        <Flex
            borderColor='blackAlpha.200'
            borderWidth='1px'
            borderRadius='8px'
            overflow='hidden'
            w='100%'
            display='flex'
            maxH={{ base: '128px', md: 'auto' }}
        >
            <Box
                maxW={{ base: '158px', lg: '345px' }}
                // width="55%"
                flexShrink={0}
                overflow='hidden'
                position='relative'
            >
                {props.el.image && (
                    <CustomImage
                        src={props.el.image}
                        alt={`Шаг ${props.el.stepNumber}`}
                        width='100%'
                        height='100%'
                        objectFit='cover'
                    />
                )}
            </Box>

            <Flex
                py={{ base: 2, lg: 5 }}
                px={{ base: 2, lg: 6 }}
                direction='column'
                justifyContent='start'
                gap={{ base: 3, lg: 4 }}
                flex='1'
            >
                <Tag alignSelf='flex-start' bg={props.isLast ? 'lime.50' : 'blackAlpha.100'}>
                    Шаг {props.el.stepNumber}
                </Tag>
                <Text fontSize='sm' fontWeight={500}>
                    {props.el.description}
                </Text>
            </Flex>
        </Flex>
    );
}

export default RecipeStepCard;
