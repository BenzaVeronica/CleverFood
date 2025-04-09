import { Flex, Text } from '@chakra-ui/react';

import { dishSubcategory } from '~/store/receipt/recipe.types';

type Props = {
    el: dishSubcategory;
};

export function SubCategoryListItem({ el }: Props) {
    // const { isOpen } = useAccordionItemState();
    // const isOpen = true;
    return (
        <Flex
            p='6px 8px 6px 40px'
            height={10}
            // as='a'
            cursor='pointer'
            alignItems='center'
            position='relative'
            _before={{
                content: '""',
                position: 'absolute',
                left: '40px',
                background: 'lime.300',
                width: '1px',
                height: '24px',
                transition: 'all 0.2s ease-in-out',
            }}
            _hover={{
                _before: {
                    width: '8px',
                    height: '28px',
                    left: '33px',
                },
            }}
        >
            <Text ml={3} textStyle='main'>
                {el.title}
            </Text>
        </Flex>
    );
}
