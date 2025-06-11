import {
    Box,
    BoxProps,
    Grid,
    GridItemProps,
    GridProps,
    useBreakpointValue,
} from '@chakra-ui/react';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import { HEIGHT_HEADER, HEIGHT_HEADER_TABLET } from '~/theme/ui.constants';

type Props = {
    children: ReactNode;
} & GridProps;

export const ContainerGridLayout = ({ children, ...gridProps }: Props) => {
    const headerHeight = useBreakpointValue({
        base: HEIGHT_HEADER_TABLET,
        md: HEIGHT_HEADER,
    });
    const validatedChildren = Children.map(children, (child) => {
        if (isValidElement<GridItemProps>(child)) {
            return cloneElement(child, {
                colSpan: child.props.colSpan ?? { base: 4, md: 6, lg: 3 },
            });
        }
        return child;
    });
    return (
        <Grid
            templateColumns={{
                base: 'repeat(4, 1fr)',
                md: 'repeat(12, 1fr)',
            }}
            ml={{ base: 4, md: 5, lg: 6 }}
            mr={{ base: 4, md: 5, lg: '72px' }}
            gap={{ base: 4, lg: 4, xl: 6 }}
            minHeight={`calc(100vh - ${headerHeight})`}
            {...gridProps}
        >
            {validatedChildren}
        </Grid>
    );
};

type BoxLayoutProps = {
    children: ReactNode;
} & BoxProps;

export const ContainerBoxLayout = ({ children, ...otherProps }: BoxLayoutProps) => (
    <Box ml={{ base: 4, md: 5, lg: 6 }} mr={{ base: 4, md: 5, lg: '72px' }} {...otherProps}>
        {children}
    </Box>
);
