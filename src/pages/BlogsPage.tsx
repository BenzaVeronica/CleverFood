import { GridItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import UserList from '~/components/UserList';
import { useLazyGetAllBloggersQuery } from '~/query/blogs/blogs.api';
import { TOAST_MESSAGE } from '~/query/errors/error.constants';
import { CustomErrorResponse } from '~/query/errors/error.type';
import { isServerError } from '~/query/errors/error.utils';
import { useAuth } from '~/store/auth/useAuth';
import { useAppDispatch } from '~/store/hooks';
import useBreakpoints from '~/utils/useBreakpoints';
import { addError } from '~/widgets/error/error-slice';

export function BlogsPage() {
    const { user } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const [fetchAllBloggers, { data, error }] = useLazyGetAllBloggersQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.userId) return;

        fetchAllBloggers({
            currentUserId: user.userId,
            limit: '9',
        });
    }, [user?.userId]);

    useEffect(() => {
        if (!error) return;
        const customError = error as CustomErrorResponse;
        if (isServerError(customError.status)) {
            navigate('/');
            dispatch(addError(TOAST_MESSAGE.ServerErrorToast));
        }
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
