import { Button, Flex, Icon } from '@chakra-ui/react';
import React from 'react';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import People from '../../assets/iconSMPeople.svg?react';

type Props = {
    // title?: string;
};

function UserStat(_props: Props) {
    return (
        <Flex
            pt={{ base: 0, md: 4 }}
            px={{ base: 0, md: 12 }}
            gap={{ base: 0, md: 6 }}
            flexDirection={{ base: 'row', md: 'column' }}
            alignItems='center'
        >
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', md: '16px' }}
                leftIcon={<Icon as={Bookmark} boxSize={{ base: 3, md: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                185
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', md: '16px' }}
                leftIcon={<Icon as={Like} boxSize={{ base: 3, md: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                589
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', md: '16px' }}
                leftIcon={<Icon as={People} boxSize={{ base: 3, md: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                587
            </Button>
        </Flex>
    );
}

export default UserStat;
