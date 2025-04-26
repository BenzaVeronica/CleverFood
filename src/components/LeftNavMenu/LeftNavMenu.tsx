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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useMobileMenu } from '~/context/MobileMenuContext';
import { masDishCategories } from '~/store/category/category.constants';
import { dishCategory } from '~/store/category/category.types';
import useBreakpoints from '~/utils/useBreakpoints';

import { IconExit } from '../Icons/IconExit';
import CustomBreadcrumb from '../UI/Breadcrumb';
import LeftNavMenuWrapper from './LeftNavMenuWrapper';
import { SubCategoryListItem } from './SubCategoryListItem';

type Props = {
    // title?: string;
};

function LeftNavMenu(_props: Props) {
    const navigate = useNavigate();

    const handleAccordionClick = (item: dishCategory) => {
        if (item.subcategories && item.subcategories.length > 0) {
            navigate(`${item.url}/${item.subcategories[0].url}`);
        } else {
            navigate(item.url);
        }
    };
    const { isTablet } = useBreakpoints();
    const { categoryId, subcategoryId } = useParams();
    const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (categoryId) {
            const foundIndex = masDishCategories.findIndex((el) => el.url === categoryId);
            setActiveTabIndex(foundIndex >= 0 ? foundIndex : null);
        } else {
            setActiveTabIndex(null);
        }
    }, [categoryId, subcategoryId]);

    // const { recipeId } = useParams();
    // const [currentRecipe, setCurrentRecipe] = useState<recipe | null>(
    //     MAS_RECIPES.find((el) => el.id == recipeId) || null,
    // );
    // useEffect(() => {
    //     setCurrentRecipe(MAS_RECIPES.find((el) => el.id == recipeId) || null);
    // }, [recipeId]);
    const { closeMenu } = useMobileMenu();
    return (
        <LeftNavMenuWrapper isMobile={isTablet}>
            {isTablet && <CustomBreadcrumb closeMenu={closeMenu} />}
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
                <Accordion
                    allowToggle
                    allowMultiple={false}
                    index={activeTabIndex !== null ? [activeTabIndex] : []}
                >
                    {masDishCategories.map((item, index) => (
                        <AccordionItem
                            key={`LeftNavMenu_${item.url}${index}`}
                            border='none'
                            // data-test-id={`${item.url}`}
                            data-test-id={item.url === 'vegan' ? 'vegan-cuisine' : item.url}
                        >
                            <AccordionButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAccordionClick(item);
                                }}
                                // data-test-id={item.url === 'vegan' ? 'vegan-cuisine' : ''}
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
                                        // index={j}
                                        onClick={() => navigate(`${item.url}/${el.url}`)}
                                    />
                                ))}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
            <Flex
                flexDirection='column'
                gap={4}
                mb={{ base: 0, lg: 8 }}
                px={6}
                maxWidth={{ base: '100%', lg: '210px' }}
            >
                <Text
                    mt={{ base: 0, lg: 4 }}
                    fontSize='xs'
                    fontWeight='medium'
                    color='blackAlpha.400'
                >
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
        </LeftNavMenuWrapper>
    );
}

export default LeftNavMenu;
