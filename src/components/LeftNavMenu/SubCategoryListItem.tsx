import { Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { dishSubcategory } from '~/store/category/category.types';

type Props = {
    el: dishSubcategory;
    // index: number;
    onClick: () => void;
};

export function SubCategoryListItem({ el, onClick }: Props) {
    // const { isOpen } = useAccordionItemState();
    // const isOpen = true;
    const { subcategoryId } = useParams();
    const isActive = subcategoryId === el.url;
    return (
        <Flex
            data-test-id={isActive ? `${el.url}-active` : ''}
            onClick={onClick}
            p='6px 8px 6px 40px'
            height={10}
            // as='a'
            cursor='pointer'
            alignItems='center'
            position='relative'
            _before={{
                content: '""',
                position: 'absolute',
                background: 'lime.300',
                width: isActive ? '8px' : '1px',
                height: isActive ? '28px' : '24px',
                left: isActive ? '33px' : '40px',
                transition: 'all 0.2s ease-in-out',
            }}
            _hover={{
                bg: 'lime.100',
                // _before: {
                //     width: '8px',
                //     height: '28px',
                //     left: '33px',
                // },
            }}
        >
            <Text ml={3} fontSize='md' fontWeight={isActive ? 'bold' : 'normal'}>
                {el.title}
            </Text>
        </Flex>
    );
}
