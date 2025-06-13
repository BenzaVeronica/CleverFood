import { Button, Flex, FlexProps, Icon } from '@chakra-ui/react';

import OkIcon from '~/assets/ok-filled.svg?react';

import Bookmark from '../../assets/iconSMBookmark.svg?react';
import Like from '../../assets/iconSMLike.svg?react';
import People from '../../assets/users-filled.svg?react';

type Props = {
    flexProps?: FlexProps;
};
export function UserStat({ flexProps }: Props) {
    const recommend = false;
    return (
        <Flex alignItems='center' {...flexProps}>
            {recommend && (
                <Button
                    px={[2, 4]}
                    fontSize={{ base: '12px', lg: '16px' }}
                    leftIcon={<Icon as={OkIcon} boxSize={{ base: 3, lg: 4 }} />}
                    colorScheme='lime'
                    variant='ghost'
                >
                    3
                </Button>
            )}
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
