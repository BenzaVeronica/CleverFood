export type User = {
    userId: string;
    login: string;
};
export type SubscriptionRequest = {
    fromUserId: string;
    toUserId: string;
};

export type UserRequest = {
    firstName: string;
    lastName: string;
};

export type PasswordRequest = {
    password: string;
    newPassword: string;
};

export type UserPhotoResponse = {
    photoLink: string;
};

export type UserNoteRequest = {
    text: string;
};
export type UserNoteResponse = {
    _id: string;
    date: string;
    text: string;
};

export type UserAllResponse = {
    id: string;
    photo: string;
    login: string;
    firstName: string;
    lastName: string;
};
export type UserInfo = UserAllResponse & {
    photoLink: string;
};
