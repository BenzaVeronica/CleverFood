import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { recipe } from '~/store/recipe/recipe.types';

type Props = {
    item: recipe;
};

function IngridientsTable(props: Props) {
    const [portions, setPortions] = useState(props.item.portions || 2);

    return (
        <Flex direction='column' alignItems='center' justifyContent='space-between'>
            <Flex w='100%' py={5} fontWeight={600} alignItems='center'>
                <Text
                    flex={1}
                    fontSize='xs'
                    color='lime.600'
                    textTransform='uppercase'
                    ml={{ base: 1, md: 6 }}
                >
                    ИНГРЕДИЕНТЫ
                </Text>
                <Flex gap={{ base: 3, md: 4 }} justifyContent='flex-end' alignItems='center'>
                    <Text flex={1} fontSize='xs' color='lime.600' textTransform='uppercase'>
                        ПОРЦИЙ
                    </Text>
                    <NumberInput
                        size='md'
                        w='90px'
                        defaultValue={props.item.portions || 2}
                        min={1}
                        max={10}
                        value={portions}
                        onChange={(valueString) => setPortions(parseInt(valueString) || 0)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Flex>
            {props.item.ingredients.map((el, index) => (
                <Flex
                    key={`IngridientsTable_${el.title}`}
                    w='100%'
                    justifyContent='flex-end'
                    alignItems='center'
                    py={{ base: '10px', md: 4 }}
                    px={{ base: 3, md: 6 }}
                    bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                >
                    <Text flex={1} fontSize='sm' color='blackAlpha.900'>
                        {el.title}
                    </Text>
                    <Flex flex={1} justifyContent='flex-end' gap={1}>
                        <Text
                            fontSize='sm'
                            color='blackAlpha.900'
                            textAlign='right'
                            data-test-id={`ingredient-quantity-${index}`}
                        >
                            {Number(el.count)
                                ? (Number(el.count) / props.item.portions || 2) * portions
                                : ''}
                        </Text>
                        <Text
                            fontSize='sm'
                            color='blackAlpha.900'
                            textAlign='right'
                            data-test-id={`ingredient-quantity-${index}`}
                        >
                            {el.measureUnit}
                        </Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
}

export default IngridientsTable;
