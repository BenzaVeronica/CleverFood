import './App.css';

import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import Footer from '~/components/Footer';
import Header from '~/components/Header/Header.tsx';
import LeftNavMenu from '~/components/LeftNavMenu';
import RightAside from '~/components/RightAside';

function App() {
    return (
        <Box
        // position='relative' maxH={{ base: 'calc(100vh - 64px)', lg: 'auto' }}
        >
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
                <LeftNavMenu />
            </Box>
            <Box
                ml={{ base: 0, lg: 64 }}
                mt={{ base: 16, lg: 20 }}
                pb={{ base: '84px', lg: '0' }}
                width={{ base: '100vw', lg: 'calc(100vw - 256px - 208px)' }}
                // position='relative'
                // maxH={{ base: 'calc(100vh - 64px)', lg: 'auto' }}
                // background='white'
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
    );
}

export default App;
