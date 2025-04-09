import profile0 from '../assets/profile/profile0.jpg';
import profile1 from '../assets/profile/profile1.png';
import profile2 from '../assets/profile/profile2.png';
import profile3 from '../assets/profile/profile3.png';
import { addIdToArray } from '../utils';
import { blogItem, blogItemWithoutId, profile, profileWithoutId } from './blog.types';

const masProfilesWithoutId: profileWithoutId[] = [
    {
        name: 'Екатерина',
        surname: 'Константинопольская',
        username: '@bake_and_pie',
        img: profile0,
        statistics: {
            like: null,
            bookmarks: null,
            views: null,
        },
    },
    {
        name: 'Елена',
        surname: 'Высоцкая',
        username: '@elenapovar',
        img: profile1,
        statistics: {
            like: null,
            bookmarks: null,
            views: null,
        },
    },
    {
        name: 'Alex',
        surname: 'Cook',
        username: '@funtasticooking',
        img: profile2,
        statistics: {
            like: null,
            bookmarks: null,
            views: null,
        },
    },
    {
        name: 'Екатерина',
        surname: 'Константинопольская',
        username: '@bake_and_pie',
        img: profile3,
        statistics: {
            like: null,
            bookmarks: null,
            views: null,
        },
    },
];

export const masProfiles: profile[] = addIdToArray(masProfilesWithoutId);
console.log(masProfiles);

const masBlogItemWithoutId: blogItemWithoutId[] = [
    {
        profile: masProfiles[1],
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        // like: null,
        // bookmarks: 1,
    },
    {
        profile: masProfiles[2],
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        // like: null,
        // bookmarks: 1,
    },
    {
        profile: masProfiles[3],
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        // like: null,
        // bookmarks: 1,
    },
];
export const masBlogItems: blogItem[] = addIdToArray(masBlogItemWithoutId);
console.log(masProfiles);
