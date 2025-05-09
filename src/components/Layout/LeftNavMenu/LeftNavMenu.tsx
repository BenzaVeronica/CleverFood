import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import CustomImage from '~/components/UI/CustomImage/CustomImage';
import { useMobileMenu } from '~/context/MobileMenuContext';
import { useGetNavTreeQuery } from '~/query/category/category.api';
import { RootCategory } from '~/query/category/category.types';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';
import useBreakpoints from '~/utils/useBreakpoints';

import { IconExit } from '../../Icons/IconExit';
import CustomBreadcrumb from '../../UI/Breadcrumb';
import LeftNavMenuWrapper from './LeftNavMenuWrapper';
import { SubCategoryListItem } from './SubCategoryListItem';

type Props = {
    // title?: string;
};

function LeftNavMenu(_props: Props) {
    const navigate = useNavigate();

    useGetNavTreeQuery();
    const { categories } = useAppSelector(selectCategoriesWithSubs);

    const handleAccordionClick = (item: RootCategory) => {
        if (item.subCategories && item.subCategories.length > 0) {
            navigate(`${item.category}/${item.subCategories[0].category}`);
        } else {
            navigate(item.category);
        }
    };
    const { isTablet } = useBreakpoints();
    const { categoryId } = useParams();
    const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
    const hasCategories = categories.length > 0;
    useEffect(() => {
        window.scrollTo(0, 0);
        if (categoryId && hasCategories) {
            const foundIndex = categories.findIndex((el) => el.category === categoryId);
            setActiveTabIndex(foundIndex >= 0 ? foundIndex : null);
        } else {
            setActiveTabIndex(null);
        }
    }, [categoryId, categories, hasCategories]);

    const { closeMenu } = useMobileMenu();
    return (
        <LeftNavMenuWrapper isMobile={isTablet}>
            {isTablet && <CustomBreadcrumb closeMenu={closeMenu} />}
            <Box overflowY='scroll' flex='1' mr={1} layerStyle='customScroll'>
                <Accordion
                    allowToggle
                    allowMultiple={false}
                    index={activeTabIndex !== null ? [activeTabIndex] : []}
                >
                    {categories.map((item, index) => (
                        <AccordionItem
                            key={`LeftNavMenu_${item.category}${index}`}
                            border='none'
                            // data-test-id={`${item.category}`}
                            data-test-id={
                                item.category === 'vegan' ? 'vegan-cuisine' : item.category
                            }
                        >
                            <AccordionButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAccordionClick(item);
                                }}
                                // data-test-id={item.category === 'vegan' ? 'vegan-cuisine' : ''}
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
                                <CustomImage src={item.icon} />
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
                                {item.subCategories?.map((el, j) => (
                                    <SubCategoryListItem
                                        key={`${el.category}${j}`}
                                        el={el}
                                        onClick={() => navigate(`${item.category}/${el.category}`)}
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
