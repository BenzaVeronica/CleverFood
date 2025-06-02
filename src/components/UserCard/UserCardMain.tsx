import { Avatar, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';

import { profile } from '~/store/blog/blog.types';

import userDone from '../../assets/user-done.svg?react';
import Subscribe from '../../assets/user-plus.svg?react';
import CardStat from '../CardStat';

type Props = {
    profile: profile;
};

export function UserCardMain(props: Props) {
    const isSubscribe = true;
    return (
        <Flex p={{ base: 4 }} justifyContent='center'>
            <Flex bg='white' gap={{ base: 6 }} w='fit-content' maxW='680px'>
                <Avatar
                    size='2xl'
                    src={props.profile.img}
                    name={`${props.profile.name} ${props.profile.surname}`}
                />
                <Stack flex='1'>
                    <Flex
                        flexDirection='column'
                        justifyContent='space-between'
                        alignItems='start'
                        gap={3}
                    >
                        <Text
                            fontSize={{ base: '5xl', xl: '5xl' }}
                            lineHeight='100%'
                            fontWeight={600}
                            isTruncated
                        >
                            {props.profile.name} {props.profile.surname}
                        </Text>
                        <Text fontSize='sm' color='blackAlpha.700'>
                            {props.profile.username}
                        </Text>
                        <Flex justifyContent='space-between' alignItems='center' w='100%'>
                            {isSubscribe ? (
                                <Button
                                    size='sm'
                                    variant='btnOutlineBlack'
                                    leftIcon={<Icon as={userDone} />}
                                >
                                    Вы подписаны
                                </Button>
                            ) : (
                                <Button
                                    size='sm'
                                    colorScheme='black'
                                    leftIcon={<Icon as={Subscribe} />}
                                >
                                    Подписаться
                                </Button>
                            )}
                            <CardStat bookmarks={70} like={210} />
                        </Flex>
                    </Flex>
                </Stack>
            </Flex>
        </Flex>
    );
}
