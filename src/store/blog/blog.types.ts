export type blogItem = {
    text: string;
    profile: profile;
    // like: number | null,
    // bookmarks: number | null,
};
export type profile = {
    id: number;
    name: string;
    surname: string;
    username: string;
    img: string;
    statistics: statistics;
};
export type statistics = {
    like: number | null;
    bookmarks: number | null;
    views: number | null;
};
export type profileWithoutId = Omit<profile, 'id'>;
export type blogItemWithoutId = Omit<blogItem, 'id'>;
