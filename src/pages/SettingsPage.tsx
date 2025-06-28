import { Box, GridItem, useDisclosure, VStack } from '@chakra-ui/react';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import Bookmark from '~/assets/bookmark-filled-black.svg?react';
import Like from '~/assets/like-filled-black.svg?react';
import FormSettings from '~/components/FormSettings';
import ModalConfirmDelete from '~/components/ModalConfirmDelete';
import RecomendationBanner from '~/components/RecomendationBanner';
import StatisticsSubscribers from '~/components/Statistics';
import { StatisticsChart } from '~/components/Statistics/StatisticsChart';
import { StatisticsRecommendations } from '~/components/Statistics/StatisticsRecommendations';
import InfoTitleButton from '~/components/UI/InfoTitleButton';
import Title from '~/components/UI/Title';
import { useGetStatisticQuery } from '~/query/statistic/statistic.api';
import { useDeleteProfileMutation } from '~/query/user/user.api';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';
import { pluralizeBookmark, pluralizeLikes } from '~/utils/pluralizeRecipes';
import { useToastNotifications } from '~/utils/useToastNotifications';
import ErrorNotification from '~/widgets/error/ErrorNotification';

export default function SettingsPage() {
    const { data } = useGetStatisticQuery();

    const [deleteProfile] = useDeleteProfileMutation();
    const { handleServerError } = useToastNotifications();
    const { logout } = useAuth();
    const handleDelete = async () => {
        try {
            await deleteProfile().unwrap();
            logout();
        } catch (error) {
            handleServerError(error);
        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <ContainerGridLayout gap={{ base: 4, lg: 10 }}>
            <ErrorNotification />
            <GridItem colSpan={{ base: 4, md: 12 }} mt={6}>
                <FormSettings />
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 12, xl: 10 }}>
                <Box w={{ base: '120%', xl: '100%' }}>
                    <Title>Статистика</Title>
                    <VStack spacing={4} alignItems='start'>
                        <StatisticsSubscribers />
                        {data && (
                            <>
                                <StatisticsChart
                                    icon={Bookmark}
                                    title={pluralizeBookmark(data?.bookmarks.length)}
                                    // data={MOCK_TEST_BOOKMARK_CHART}
                                    data={data?.bookmarks}
                                />
                                <StatisticsChart
                                    icon={Like}
                                    title={pluralizeLikes(data.likes.length)}
                                    data={data?.likes}
                                    color='#8884d8'
                                />
                            </>
                        )}
                    </VStack>
                </Box>
                <Box data-test-id={TEST_ID.sprint7.settingsrecommendationinfo}>
                    <RecomendationBanner flexProp={{ mt: 10 }} />
                    <StatisticsRecommendations
                        length={data?.recommendationsCount ?? 0}
                        data={data?.recipesWithRecommendations}
                    />
                </Box>
            </GridItem>

            {/* <GridItem colSpan={{ base: 4, md: 12 }}>
            </GridItem> */}
            <GridItem colSpan={{ base: 4, md: 10 }} mb={{ base: 4, lg: 10 }}>
                <VStack spacing={10}>
                    <InfoTitleButton
                        title='О проекте'
                        btn='Связаться с '
                        linkText=' разработчиками'
                        link='https://clevertec.ru/'
                    />
                    <InfoTitleButton
                        title='Удаление аккаунта'
                        btn='Удалить мой аккаунт'
                        onClick={onOpen}
                    />
                </VStack>
            </GridItem>
            <ModalConfirmDelete isOpen={isOpen} onClose={onClose} onSuccess={handleDelete} />
        </ContainerGridLayout>
    );
}
