import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { masDishCategories } from '~/store/recipe/recipe.constants';
import { dishCategory } from '~/store/recipe/recipe.types';

import { IconExit } from '../Icons/IconExit';
import { SubCategoryListItem } from './SubCategoryListItem';

type Props = {
    // title?: string;
};

function LeftNavMenu(_props: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    const handleAccordionClick = (item: dishCategory) => {
        if (item.subcategories && item.subcategories.length > 0) {
            navigate(`${item.url}/${item.subcategories[0].url}`);
        } else {
            navigate(item.url);
        }
    };
    return (
        <Flex flexDirection='column' height='100%' justifyContent='space-between'>
            <Box
                overflowY='scroll'
                flex='1'
                mr={1}
                css={{
                    '&::-webkit-scrollbar': {
                        background: 'rgba(0, 0, 0, 0.04)',
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0, 0, 0, 0.16)',
                        borderRadius: '8px',
                        width: '8px',
                        height: '8px',
                        border: '4px solid transparent',
                    },
                }}
            >
                <Accordion allowToggle allowMultiple={false} index={isHomePage ? [] : undefined}>
                    {masDishCategories.map((item, index) => (
                        <AccordionItem key={`LeftNavMenu_${item.url}${index}`} border='none'>
                            <AccordionButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAccordionClick(item);
                                }}
                                data-test-id={item.url === 'vegan-cuisine' ? 'vegan-cuisine' : ''}
                                fontWeight='500'
                                py={3}
                                px={2}
                                borderWidth='1px'
                                borderColor='white'
                                _expanded={{ bg: 'lime.100', fontWeight: '700' }}
                                _hover={{
                                    bg: 'lime.150',
                                    borderColor: 'lime.100',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                    borderColor: 'lime.100',
                                }}
                            >
                                {/* <item.icon/> */}
                                <Image src={item.icon} alt={item.title} />
                                <Box as='span' flex='1' textAlign='left' mr={3} ml={3}>
                                    {item.title}
                                </Box>
                                {/* <IconArrowDown/> */}
                            </AccordionButton>
                            <AccordionPanel
                                p={0}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {item.subcategories.map((el, j) => (
                                    <SubCategoryListItem
                                        key={`${el.url}${j}`}
                                        el={el}
                                        onClick={() => navigate(`${item.url}/${el.url}`)}
                                    />
                                ))}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
            <Flex flexDirection='column' gap={4} mb={8} px={6} maxWidth='210px'>
                <Text mt={2} fontSize='xs' fontWeight='medium' color='blackAlpha.400'>
                    Версия программы 03.25
                </Text>
                <Text fontSize='xs' fontWeight='normal' color='blackAlpha.700'>
                    Все права защищены, ученический файл, <br />
                    &copy; Клевер Технолоджи, 2025
                </Text>
                {/* <Button leftIcon={<IconExit />} variant={'ghost'} size='xs'>Выйти</Button> */}
                <Flex alignItems='center' as='button'>
                    <IconExit boxSize={3} mr='6px' />
                    <Text fontSize='xs' fontWeight='600'>
                        Выйти
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default LeftNavMenu;
