export type BaseUser = {
    name: string;
    email: string;
    token: string;
};

export type MidUser = BaseUser & {
    _id: string;
    noticesFavorites: [
        {
            _id: string;
            species: string;
            category: string;
            title: string;
            name: string;
            birthday: string;
            comment: string;
            sex: string;
            location: string;
            imgURL: string;
            user: string;
            popularity: number;
        },
    ];
};

export type News = {
    _id: string;
    imgUrl: string;
    title: string;
    text: string;
    date: string;
    url: string;
    id: string;
};

export type WorkDays = {
    _id: string;
    isOpen: boolean;
    from: string;
    to: string;
};

export type Friends = {
    _id: string;
    title: string;
    url: string;
    addressUrl: string | null;
    imageUrl: string;
    address: string | null;
    phone: string;
    email: string | null;
    workDays: WorkDays[] | null;
};
