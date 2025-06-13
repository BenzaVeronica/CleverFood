import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import Logo from '~/components/UI/Logo';
import { PageRoutes } from '~/routes/PageRoutes.constants';

type Props = {
    defaultTab?: 'login' | 'register';
};

export function HeaderLogoTabs({ defaultTab = 'login' }: Props) {
    const navigate = useNavigate();
    const defaultIndex = defaultTab === 'login' ? 0 : 1;
    return (
        <>
            <Logo h={{ base: '38px', lg: '64px' }} />
            <Tabs
                mt={{ base: '40px', md: '56px', lg: '60px' }}
                mb='40px'
                defaultIndex={defaultIndex}
                variant='dark'
                fontSize={{ base: 'md', lg: 'lg' }}
            >
                <TabList>
                    <Tab mr={4} onClick={() => navigate(PageRoutes.LOGIN)}>
                        Вход на сайт
                    </Tab>
                    <Tab onClick={() => navigate(PageRoutes.REGISTER)}>Регистрация</Tab>
                </TabList>
            </Tabs>
        </>
    );
}
