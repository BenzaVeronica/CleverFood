import {
    Drawer as ChakraDrawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    Text,
} from '@chakra-ui/react';

import BsFillXCircleFill from '~/assets/BsFillXCircleFill.svg?react';
import { TEST_ID } from '~/test/test.constant';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    footerContent?: React.ReactNode;
    children?: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    dataTestId?: string;
};

export function CustomDrawer({
    isOpen,
    onClose,
    title = 'Заголовок',
    footerContent,
    children,
    size = 'md',
    dataTestId,
}: Props) {
    return (
        <ChakraDrawer isOpen={isOpen} placement='right' onClose={onClose} size={size}>
            <DrawerOverlay />
            <DrawerContent data-test-id={dataTestId} bg='white' w={{ base: '344px', lg: '453px' }}>
                <DrawerHeader
                    p={{ base: 4, lg: 8 }}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text fontSize='2xl'>{title}</Text>
                    <Icon
                        as={BsFillXCircleFill}
                        boxSize={6}
                        onClick={onClose}
                        data-test-id={TEST_ID.Drawer.FilterCloseBtn}
                    />
                </DrawerHeader>

                <DrawerBody
                    px={{ base: 4, lg: 8 }}
                    pt={{ base: 4, lg: 2 }}
                    pb={{ base: 4, lg: 0 }}
                    flex={1}
                >
                    {children}
                </DrawerBody>

                {footerContent && (
                    <DrawerFooter display='flex' flexDirection='column' alignItems='end' gap={3}>
                        {footerContent}
                    </DrawerFooter>
                )}
            </DrawerContent>
        </ChakraDrawer>
    );
}
