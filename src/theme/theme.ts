import { extendTheme } from '@chakra-ui/react';

import { themeBreakpoints } from './themeBreakpoints';
import { themeComponents } from './themeComponents';
import { themeCustomScroll } from './themeCustomScroll';

const theme = extendTheme({
    layerStyles: {
        customScroll: themeCustomScroll,
    },
    global: {
        '.search-container:has(input:focus)': {
            boxShadow: 'xl',
        },
    },
    shadows: {
        'radial-70': '0 0 15px 5px lime.50',
    },
    fonts: {
        heading: `'Inter', -apple-system, sans-serif`,
        body: `'Inter', -apple-system, sans-serif`,
        mono: `'Menlo', monospace`,
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
    fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
    },
    textStyles: {
        main: {
            fontSize: { base: 'xs', md: 'md' },
            lineHeight: { base: '16px', md: '24px' },
            fontWeight: '500',
        },
        h1: {
            fontSize: { base: '2xl', lg: '5xl' },
            fontWeight: '700',
        },
        h2: {
            fontSize: '48px',
            fontWeight: '500',
            lineHeight: '48px',
        },
        subtitle: {
            fontSize: ['lg', 'xl'],
            fontWeight: 'medium',
            color: 'gray.500',
        },
    },
    breakpoints: themeBreakpoints,
    colors: {
        white: '#ffffff',
        black: {
            500: '#000000',
        },
        limeGradient: {
            70: 'radial-gradient(50% 50% at 50% 45%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 70%)',
        },
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            500: '#2B823F',
            600: '#2DB100',
            700: '#207E00',
            800: '#134B00',
        },
    },
    components: themeComponents,
});

export default theme;
