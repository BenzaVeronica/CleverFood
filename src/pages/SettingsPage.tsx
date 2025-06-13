import { Box, GridItem, VStack } from '@chakra-ui/react';

import { ContainerGridLayout } from '~/app/ContainerAppLayout';
import Bookmark from '~/assets/bookmark-filled-black.svg?react';
import Like from '~/assets/like-filled-black.svg?react';
import OkIcon from '~/assets/ok-filled.svg?react';
import Users from '~/assets/users-filled.svg?react';
import CardList from '~/components/CardList';
import FormSettings from '~/components/FormSettings';
import RecomendationBanner from '~/components/RecomendationBanner';
import { StatisticsChart } from '~/components/Statistics/StatisticsChart';
import InfoTitleButton from '~/components/UI/InfoTitleButton';
import StatTitle from '~/components/UI/StatTitle';
import Title from '~/components/UI/Title';
import { UserAvatarList } from '~/components/UserList/UserAvatarList';
import { MAS_RECIPES } from '~/query/recipe/recipe.mock';
import { pluralizeRecomendationRecipes } from '~/utils/pluralizeRecipes';

export function SettingsPage() {
    // const isAvailableRecomend = bookmark === 200 && subcribers === 100;
    const isAvailableRecomend = true;
    const users = ['v'];
    return (
        <ContainerGridLayout gap={{ base: 4, lg: 10 }}>
            <GridItem colSpan={{ base: 4, md: 12 }} mt={6}>
                <FormSettings />
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 12, xl: 10 }}>
                <Box w={{ base: 'full', xl: '120%' }}>
                    <Title>Статистика</Title>
                    <VStack spacing={4} alignItems='start'>
                        <StatTitle icon={Users}>{users.length} подписчика</StatTitle>
                        {users.length && <UserAvatarList />}
                        <StatisticsChart icon={Bookmark} title='87 сохранений' />
                        <StatisticsChart icon={Like} title='124 лайка' />
                    </VStack>
                </Box>
                {isAvailableRecomend && <RecomendationBanner flexProp={{ mt: 10 }} />}
            </GridItem>

            <GridItem colSpan={{ base: 4, md: 12 }}>
                <StatTitle icon={OkIcon}>{pluralizeRecomendationRecipes(3)}</StatTitle>
                <CardList list={MAS_RECIPES.slice(0, 4)} withButton={false} mt={3} />
            </GridItem>
            <GridItem colSpan={{ base: 4, md: 10 }} mb={{ base: 4, lg: 10 }}>
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
