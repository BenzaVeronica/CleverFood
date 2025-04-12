import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Icon } from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router';

import { masProfiles } from '~/store/blog/blog.constants';
import { masDishCategories } from '~/store/recipe/recipe.constants';

import IconMenu from '../../assets/iconMenu.svg?react';
import { LogoIcon } from '../Icons/LogoIcon';
import { LogoText } from '../Icons/LogoText';
import UserProfile from '../UserProfile';
import UserStat from '../UserStat';

type Props = {
    // title?: string;
};

function Header(_props: Props) {
    const location = useLocation();
    const { categoryId, subcategoryId } = useParams();
    const currentCategory = masDishCategories.find((cat) => cat.url === categoryId);
    const currentSubcategory = currentCategory?.subcategories?.find(
        (sub) => sub.url === subcategoryId,
    );
    return (
        <Flex
            data-test-id='header'
            position='fixed'
            top={0}
            left={0}
            zIndex={10}
            w='100%'
            bg='lime.50'
            alignItems='center'
            justifyContent='space-between'
        >
            <Flex alignItems='end' px={{ base: 5, lg: 4 }} py={{ base: 4, lg: 6 }} as={Link} to='/'>
                <LogoIcon boxSize={8} color='lime.500' />
                <LogoText
                    display={{ base: 'none', sm: 'block' }}
                    ml={2}
                    width='auto'
                    height='25px'
                    color='lime.500'
                    secondaryColor='lime.500'
                />
            </Flex>

            <Breadcrumb
                display={{ base: 'none', lg: 'block' }}
                separator={<ChevronRightIcon color='gray.500' />}
                flex='1'
                ml={28}
            >
                <BreadcrumbItem>
                    <BreadcrumbLink
                        as={Link}
                        to='/'
                        color={location.pathname !== '/' ? 'blackAlpha.700' : undefined}
                    >
                        Главная
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {location.pathname === '/the-most' && (
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as='span'>Самое сочное</BreadcrumbLink>
                    </BreadcrumbItem>
                )}

                {currentCategory && (
                    <BreadcrumbItem isCurrentPage={!subcategoryId} color='blackAlpha.700'>
                        <BreadcrumbLink
                            as={Link}
                            to={`/${currentCategory.url}/${currentCategory.subcategories[0].url}`}
                        >
                            {currentCategory.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}

                {currentSubcategory && (
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as='span'>{currentSubcategory.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </Breadcrumb>

            <Flex mr={5} alignItems='center' display={{ base: 'flex', lg: 'none' }}>
                <UserStat />
                <Button
                    colorScheme='lime'
                    leftIcon={<Icon as={IconMenu} boxSize={6} />}
                    variant='ghost'
                    iconSpacing={0}
                    p={0}
                />
            </Flex>

            <UserProfile profile={masProfiles[0]} showOnMobile={false} mr={14} w='432px' />
            {/* <Flex gap={3} mr={14} w='432px' display={{ base: 'none', md: 'flex' }}>
                <Avatar size='md' src={profile0} name='Екатерина Константинопольская' />
                <Box flex='1'>
                    <Text fontWeight={500} fontSize={18} lineHeight='28px'>
                        Екатерина Константинопольская
                    </Text>
                    <Text fontSize={14} lineHeight='20px' color='blackAlpha.700'>
                        @bake_and_pie
                    </Text>
                </Box>
            </Flex> */}
        </Flex>
    );
}

export default Header;
