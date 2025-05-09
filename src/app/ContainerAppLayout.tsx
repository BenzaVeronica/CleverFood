import { Box, BoxProps, Grid, GridItemProps, GridProps } from '@chakra-ui/react';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    // children: ReactElement<GridItemProps>| ReactElement<GridItemProps>[];
} & GridProps;

export const ContainerGridLayout = ({ children, ...gridProps }: Props) => {
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
    <Box
        // width={{ base: 'calc(100% - 32px)', lg: 'calc(100vw - 256px - 208px - 72px)' }}
        ml={{ base: 4, md: 5, lg: 6 }}
        mr={{ base: 4, md: 5, lg: '72px' }}
        {...otherProps}
    >
        {children}
    </Box>
);
