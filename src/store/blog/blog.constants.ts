import profile0 from '../../assets/profile/profile0.jpg';
import profile1 from '../../assets/profile/profile1.jpg';
import profile2 from '../../assets/profile/profile2.jpg';
import profile3 from '../../assets/profile/profile3.jpg';
import { addIdToArray } from '../utils';

const masProfilesWithoutId = [
    {
        firstName: 'Екатерина',
        lastName: 'Константинопольская',
        login: 'bake_and_pie',
        img: profile0,
        totalSubscribers: 0,
    },
    {
        firstName: 'Елена',
        lastName: 'Высоцкая',
        login: 'elenapovar',
        img: profile1,
        totalSubscribers: 0,
    },
    {
        firstName: 'Alex',
        lastName: 'Cook',
        login: 'funtasticooking',
        img: profile2,
        totalSubscribers: 0,
    },
    {
        firstName: 'Екатерина',
        lastName: 'Константинопольская',
        login: 'bake_and_pie',
        img: profile3,
        totalSubscribers: 0,
    },
    {
        firstName: 'Сергей',
        lastName: 'Разумов',
        login: 'serge25',
        img: profile3,
        totalSubscribers: 0,
    },
];

export const masProfiles = addIdToArray(masProfilesWithoutId);

const masBlogItemWithoutId = [
    {
        profile: masProfiles[1],
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        profile: masProfiles[2],
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        profile: masProfiles[3],
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
];
export const masBlogItems = addIdToArray(masBlogItemWithoutId);
