import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { TEST_ID } from '~/test/constant';

import { AlertStatus, removeError } from '../error-slice';

function getColor(status: AlertStatus) {
    switch (status) {
        case 'success':
            return 'green.500';
        case 'error':
        default:
            return 'red.500';
    }
}
export function ErrorNotification() {
    const dispatch = useAppDispatch();
    const errors = useAppSelector((state) => state.error.list);

    useEffect(() => {
        if (errors.length === 0) return;

        const timers = errors.map((err) =>
            setTimeout(() => {
                dispatch(removeError(err.id));
            }, 7000),
        );

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [errors, dispatch]);

    if (!errors.length) return null;
    return (
        <Box
            position='absolute'
            bottom={{ base: '100px', lg: '80px' }}
            left='50%'
            transform='translateX(-50%)'
            w={{ base: '328px', md: '400px' }}
            zIndex='1700'
        >
            <VStack spacing={4} align='stretch'>
                {errors.map((err) => (
                    <Alert
                        data-test-id={TEST_ID.Notification.Error}
                        key={err.id}
                        variant='solid'
                        status={err.status}
                        bg={getColor(err.status)}
                        position='relative'
                    >
                        <AlertIcon />
                        <Box flex='1'>
                            <AlertTitle>{err.title}</AlertTitle>
                            <AlertDescription>{err.description}</AlertDescription>
                        </Box>
                        <CloseButton
                            data-test-id='close-alert-button'
                            alignSelf='flex-start'
                            mt='-10px'
                            mr='-16px'
                            onClick={() => dispatch(removeError(err.id))}
                        />
                    </Alert>
                ))}
            </VStack>
        </Box>
    );
}
