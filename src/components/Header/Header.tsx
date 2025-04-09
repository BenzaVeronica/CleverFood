import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Icon,
    Text,
} from '@chakra-ui/react';

import IconMenu from '../../assets/iconMenu.svg?react';
import profile0 from '../../assets/profile/profile0.jpg';
import { LogoIcon } from '../Icons/LogoIcon';
import { LogoText } from '../Icons/LogoText';
import UserStat from '../UserStat';

type Props = {
    // title?: string;
};

function Header(_props: Props) {
    return (
        <Flex bg='lime.50' data-test-id='header' alignItems='center' justifyContent='space-between'>
            <Flex alignItems='end' as='a' px={{ base: 5, md: 4 }} py={{ base: 4, md: 6 }}>
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
                display={{ base: 'none', md: 'block' }}
                separator={<ChevronRightIcon color='gray.500' />}
                flex='1'
                ml={28}
            >
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Главная</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>Веганская кухня</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>Вторые блюда</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Flex mr={5} alignItems='center' display={['flex', 'flex', 'flex', 'none']}>
                <UserStat />
                <Button
                    colorScheme='lime'
                    leftIcon={<Icon as={IconMenu} boxSize={6} />}
                    variant='ghost'
                    iconSpacing={0}
                    p={0}
                />
            </Flex>

            <Flex gap={3} mr={14} w='432px' display={{ base: 'none', md: 'flex' }}>
                <Avatar size='md' src={profile0} name='Екатерина Константинопольская' />
                <Box flex='1'>
                    <Text fontWeight={500} fontSize={18} lineHeight='28px'>
                        Екатерина Константинопольская
                    </Text>
                    <Text fontSize={14} lineHeight='20px' color='blackAlpha.700'>
                        @bake_and_pie
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Header;
