import { themeBtns } from './themeBtns';
import { themeInput } from './themeInput';

export const themeComponents = {
    Input: {
        variants: themeInput,
    },
    Button: {
        variants: themeBtns,
        baseStyle: {
            lineHeight: '1',
        },
    },
    FormLabel: {
        variants: {
            main: {
                fontSize: 'sm',
                color: 'black',
                fontWeight: '600',
                marginBottom: '0',
            },
        },
    },
    Switch: {
        baseStyle: {
            track: {
                bg: 'gray.200',
                _checked: {
                    bg: 'lime.400',
                },
            },
            thumb: {
                bg: 'white',
            },
        },
    },
    Breadcrumb: {
        baseStyle: {
            list: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
            },
        },
    },
    Checkbox: {
        baseStyle: {
            control: {
                borderColor: 'lime.150',
                borderWidth: '2px',
                _checked: {
                    color: 'black',
                    bg: 'lime.400',
                    borderColor: 'lime.400',
                },
            },
        },
    },
    Progress: {
        baseStyle: {
            filledTrack: {
                backgroundImage: `repeating-linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.28),
                        rgba(255, 255, 255, 0.28) 8px,
                        transparent 8px,
                        transparent 16px
                    )`,
                bgColor: 'lime.300',
            },
        },
    },
    Tabs: {
        baseStyle: {
            tablist: {
                whiteSpace: 'nowrap',
            },
            tab: {
                _selected: {
                    color: 'lime.600',
                    borderColor: 'lime.600',
                    marginBottom: '0',
                    borderBottomWidth: '2px',
                },
                '&:not([aria-selected=true])': {
                    color: 'lime.800',
                    borderColor: 'blackAlpha.200',
                    borderBottomWidth: '1px',
                    marginBottom: '1px',
                },
            },
        },
        variants: {
            dark: {
                tablist: {
                    borderColor: 'blackAlpha.200',
                    borderBottomWidth: '1px',
                    whiteSpace: 'nowrap',
                },
                tab: {
                    fontSize: 'inherit',
                    color: 'lime.800!important',
                    borderBottom: '0',
                    marginBottom: '1px',
                    _selected: {
                        color: 'lime.700!important',
                        borderColor: 'lime.700',
                        marginBottom: '0',
                        borderBottom: 'solid',
                        borderBottomWidth: '2px',
                    },
                },
            },
        },
    },
};
