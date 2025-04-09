import './App.css';

import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import Footer from '~/components/Footer';
import Header from '~/components/Header/Header.tsx';
import LeftNavMenu from '~/components/LeftNavMenu';
import RightAside from '~/components/RightAside';

function App() {
    // return (
    //   <div className="app">
    //
    //   </div>
    // )
    return (
        <div className='app'>
            <Header />
            <Flex>
                <Box
                    w={64}
                    overflow='auto'
                    height='calc(100vh - 80px)'
                    zIndex={1}
                    pt={6}
                    boxShadow='0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'
                    display={{ base: 'none', md: 'block' }}
                >
                    <LeftNavMenu />
                </Box>
                <Box flex='1'>
                    <SimpleGrid columns={2}>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Box bg='tomato' height='80px'></Box>
                        <Outlet />
                    </SimpleGrid>
                </Box>
                <Box w={52} display={{ base: 'none', md: 'block' }}>
                    <RightAside />
                </Box>
            </Flex>
            <Footer />
        </div>
    );
}

export default App;
