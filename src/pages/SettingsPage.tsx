import { GridItem, VStack } from '@chakra-ui/react';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import Bookmark from '~/assets/bookmark-filled-black.svg?react';
import Like from '~/assets/like-filled-black.svg?react';
import OkIcon from '~/assets/ok-filled.svg?react';
import Users from '~/assets/users-filled.svg?react';
import FormSettings from '~/components/FormSettings';
import RecomendationBanner from '~/components/RecomendationBanner';
import { StatisticsChart } from '~/components/Statistics/StatisticsChart';
import InfoTitleButton from '~/components/UI/InfoTitleButton';
import StatTitle from '~/components/UI/StatTitle';
import Title from '~/components/UI/Title';
import { UserAvatarList } from '~/components/UserList/UserAvatarList';
import { pluralizeRecomendationRecipes } from '~/utils/pluralizeRecipes';

export function SettingsPage() {
    return (
        <ContainerGridLayout gap={{ base: 4, lg: 10 }}>
            <GridItem colSpan={{ base: 4, md: 12 }}>
                <Title>Авторизация и персонализация</Title>
                <FormSettings />

                <Title>Статистика</Title>
                <UserAvatarList />
                <StatTitle icon={Users}>102 подписчика</StatTitle>
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 10 }}>
                <StatisticsChart icon={Bookmark} title='87 сохранений' />
                <StatisticsChart icon={Like} title='124 лайка' />
                <RecomendationBanner />
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 12 }}>
                <StatTitle icon={OkIcon}>{pluralizeRecomendationRecipes(3)}</StatTitle>
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 10 }}>
                <VStack spacing={10}>
                    <InfoTitleButton
                        title='О проекте'
                        btn='Связаться с'
                        linkText='разработчиками'
                        link='#'
                    />
                    <InfoTitleButton title='Удаление аккаунта' btn='Удалить мой аккаунт' />
                </VStack>
            </GridItem>
        </ContainerGridLayout>
    );
}
