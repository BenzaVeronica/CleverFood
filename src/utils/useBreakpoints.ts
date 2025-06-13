import { useMediaQuery } from '@chakra-ui/react';

type Breakpoints = {
    isMobile: boolean;
    isTablet: boolean;
    isSmallDesktop: boolean;
    isDesktop: boolean;
};

const useBreakpoints = (): Breakpoints => {
    const [isMobile] = useMediaQuery('(max-width: 360px)');
    const [isTablet] = useMediaQuery('(max-width: 768px)');
    const [isSmallDesktop] = useMediaQuery('(max-width: 1439px)');
    const [isDesktop] = useMediaQuery('(max-width: 1920px)');

    return {
        isMobile,
        isTablet,
        isSmallDesktop,
        isDesktop,
    };
};

export default useBreakpoints;
