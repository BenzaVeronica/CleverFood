import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    global: {
        '.search-container:has(input:focus)': {
            boxShadow: 'xl',
        },
    },
    shadows: {
        'radial-70': '0 0 15px 5px lime.50',
    },
    fonts: {
        // --font-family: "Inter", sans-serif;
        // --second-family: "Roboto", sans-serif;
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
    //  textStyle="h1"
    textStyles: {
        main: {
            fontSize: { base: 'xs', md: 'md' },
            lineHeight: { base: '16px', md: '24px' },
            fontWeight: '500',
        },
        // textxs: {
        //   fontSize: "12px",
        //   lineHeight: "16px",
        //   fontWeight: "600",
        // },
        // limetext: {
        //   fontSize: { base: "xs", lg: "md" },
        //   lineHeight: { base: "16px", lg: "24px" },
        //   fontWeight: "600",
        //   color: "lime.600",
        // },
        h1: {
            // fontSize: ['4xl', '5xl'],
            // fontSize: '48px',
            fontSize: { base: '2xl', lg: '5xl' },
            fontWeight: '700',
            // lineHeight: '48px',
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
    breakpoints: {
        base: '0px',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
    },
    colors: {
        white: {
            500: '#ffffff',
        },
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
    components: {
        Breadcrumb: {
            baseStyle: {
                list: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                },
            },
        },
        // Grid: {
        //     baseStyle: {
        //         responsiveLayout: {
        //             templateColumns: {
        //                 base: 'repeat(4, 1fr)',
        //                 md: 'repeat(12, 1fr)',
        //             },
        //             ml: { base: 4, md: 5, lg: 6 },
        //             mr: { base: 4, md: 5, lg: '72px' },
        //             gap: { base: 4, lg: 4, xl: 6 },
        //         },
        //     },
        // },
    },
    // grid: {
    //     templateColumns: {
    //         responsive: {
    //             base: 'repeat(4, 1fr)',
    //             md: 'repeat(12, 1fr)',
    //         },
    //     },
    // },
});

export default theme;
