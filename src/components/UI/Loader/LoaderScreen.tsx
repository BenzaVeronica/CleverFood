import { Box } from '@chakra-ui/react';

import Loader from './Loader';

function LoaderScreen() {
    return (
        <Box
            data-test-id='app-loader'
            position='fixed'
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='blackAlpha.600'
            backdropFilter='blur(2px)'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex={100}
        >
            <Loader />
        </Box>
    );
}

export default LoaderScreen;
