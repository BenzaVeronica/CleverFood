import { GridItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import UserList from '~/components/UserList';
import { useLazyGetAllBloggersQuery } from '~/query/blogs/blogs.api';
import { useAuth } from '~/store/auth/useAuth';
import useBreakpoints from '~/utils/useBreakpoints';
import { useToastNotifications } from '~/utils/useToastNotifications';

export default function BlogsPage() {
    const { user } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const [fetchAllBloggers, { data, error }] = useLazyGetAllBloggersQuery();

    useEffect(() => {
        if (!user?.userId) return;

        fetchAllBloggers({
            currentUserId: user.userId,
            limit: '9',
        });
    }, [user?.userId]);

    const { handleServerError } = useToastNotifications();
    useEffect(() => {
        if (!error) return;
        handleServerError(error, { redirectPath: '/' });
    }, [error]);

    const handleToggle = () => {
        if (!expanded) {
            fetchAllBloggers({
                currentUserId: user?.userId || '',
                limit: 'all',
            });
        }
        setExpanded(!expanded);
    };
    const { isDesktop } = useBreakpoints();
    const count = isDesktop ? 9 : 8;
    const visibleOthers = expanded ? data?.others || [] : (data?.others || []).slice(0, count);

    if (!data) return;

    return (
        <ContainerGridLayout>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <Text fontSize='5xl' fontWeight='600' textAlign='center' mt={8} mb={6}>
                    Кулинарные блоги
                </Text>
                {!!data?.favorites?.length && (
                    <UserList
                        mas={data?.favorites}
                        title='Избранные блоги'
                        isFavBlock
                        colSpan={6}
                        isVisNewRecipesCount
                    />
                )}
                <UserList mas={visibleOthers} handleToggle={handleToggle} expanded={expanded} />
            </GridItem>
        </ContainerGridLayout>
    );
}
