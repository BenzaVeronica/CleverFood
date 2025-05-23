import './App.css';

import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header/Header';
import LeftNavMenu from '~/components/Layout/LeftNavMenu';
import RightAside from '~/components/Layout/RightAside';
import { AppProviders } from '~/context/AppContext';
import { useAppDispatch } from '~/store/hooks';
import { resetFilters } from '~/store/recipe/recipe-filter-slice';
import useBreakpoints from '~/utils/useBreakpoints';

function App() {
    const { isTablet } = useBreakpoints();

    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetFilters());
    }, [dispatch, location.pathname]);

    return (
        <AppProviders>
            <Box>
                <Header />
                <Box
                    position='fixed'
                    top={20}
                    background='white'
                    w={64}
                    overflow='auto'
                    height='calc(100vh - 80px)'
                    zIndex={1}
                    pt={6}
                    boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
                    display={{ base: 'none', lg: 'block' }}
                >
                    {!isTablet && <LeftNavMenu />}
                </Box>
                <Box
                    ml={{ base: 0, lg: 64 }}
                    pt={{ base: 16, lg: 20 }}
                    pb={{ base: '84px', lg: '0' }}
                    width={{ base: 'calc(100% - 16px)', lg: 'calc(100vw - 256px - 208px)' }}
                    background='white'
                    minH='100vh'
                >
                    <Outlet />
                    <Box
                        background='white'
                        w={52}
                        display={{ base: 'none', lg: 'block' }}
                        position='fixed'
                        right={0}
                        top={20}
                    >
                        <RightAside />
                    </Box>
                </Box>
                <Footer />
            </Box>
        </AppProviders>
    );
}

export default App;
