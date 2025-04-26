import { Flex, Text } from '@chakra-ui/react';

import { useAuth } from '~/store/user/useAuth';

import { IconWriteCircle } from '../Icons/IconWriteCircle';
import UserStat from '../UserStat';

type Props = {
    // title?: string;
};

function RightAside(_props: Props) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;
    return (
        <Flex flexDirection='column' justifyContent='space-between' h='calc(100vh - 80px)'>
            <UserStat />
            <Flex
                h='208px'
                bg='limeGradient.70'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
                as='button'
            >
                <IconWriteCircle isActive boxSize={12} mb={3} />
                <Text fontSize='12px' lineHeight='16px' color='blackAlpha.700'>
                    Записать рецепт
                </Text>
            </Flex>
        </Flex>
    );
}

export default RightAside;
