import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    VStack,
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { removeError } from '../error-slice';

function ErrorNotification() {
    const dispatch = useAppDispatch();
    const errors = useAppSelector((state) => state.error.list);

    if (!errors.length) return null;

    return (
        <Box
            position='fixed'
            bottom='1rem'
            left='50%'
            transform='translateX(-50%)'
            zIndex={100}
            w={{ base: '328px', lg: '400px' }}
        >
            <VStack spacing={4} align='stretch'>
                {errors.map((err) => (
                    <Alert
                        data-test-id='error-notification'
                        key={err.id}
                        variant='solid'
                        status='error'
                        // status={err.status || 'error'}
                        bg='red.500'
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

export default ErrorNotification;
