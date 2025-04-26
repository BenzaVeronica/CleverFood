import { Button, Flex, Icon } from '@chakra-ui/react';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import People from '../../assets/iconSMPeople.svg?react';

type Props = {
    // title?: string;
};

function UserStat(_props: Props) {
    return (
        <Flex
            pt={{ base: 0, lg: 4 }}
            px={{ base: 0, lg: 12 }}
            gap={{ base: 0, lg: 6 }}
            flexDirection={{ base: 'row', lg: 'column' }}
            alignItems='center'
        >
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={Bookmark} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                185
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={Like} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                589
            </Button>
            <Button
                px={[2, 4]}
                fontSize={{ base: '12px', lg: '16px' }}
                leftIcon={<Icon as={People} boxSize={{ base: 3, lg: 4 }} />}
                colorScheme='lime'
                variant='ghost'
            >
                587
            </Button>
        </Flex>
    );
}

export default UserStat;
