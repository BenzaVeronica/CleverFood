import { Avatar, Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';

import { profile } from '~/store/blog/blog.types';

import PeopleOutline from '../../assets/iconSMPeopleOutline.svg?react';
import Subscribe from '../../assets/iconSubscribe.svg?react';

type Props = {
    profile: profile;
};

function CardUser(props: Props) {
    return (
        <Flex
            bg='lime.300'
            borderWidth={1}
            borderRadius='8px'
            px={{ base: 3, md: 6 }}
            py={{ base: 5, md: 6 }}
            gap={{ base: 2, md: 4 }}
            position='relative'
        >
            <Avatar
                size='xl'
                src={props.profile.img}
                name={`${props.profile.name} ${props.profile.surname}`}
            />
            <Stack flex='1'>
                <Flex justifyContent='space-between' alignItems='start'>
                    <Box>
                        <Text fontSize={{ base: 'lg', xl: '2xl' }} fontWeight={600} isTruncated>
                            {props.profile.name} {props.profile.surname}
                        </Text>
                        <Text fontSize='sm' color='blackAlpha.700'>
                            {props.profile.username}
                        </Text>
                    </Box>
                    <Text
                        fontSize='sm'
                        top={{ base: 2, md: '0' }}
                        right={{ base: 2, md: '0' }}
                        position={{ base: 'absolute', md: 'initial' }}
                    >
                        Автор рецепта
                    </Text>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Button size='sm' colorScheme='black' leftIcon={<Icon as={Subscribe} />}>
                        Подписаться
                    </Button>
                    <Button
                        px={[2, 4]}
                        h='24px'
                        fontSize={{ base: '12px', lg: '16px' }}
                        leftIcon={<Icon as={PeopleOutline} boxSize={{ base: 3, lg: 4 }} />}
                        colorScheme='lime'
                        variant='ghost'
                    >
                        {props.profile.statistics?.views}
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    );
}

export default CardUser;
