export type BaseUser = {
    name: string;
    email: string;
    token: string;
};

export type FullUser = BaseUser & {
    _id: string;
    noticesFavorites: [
        {
            _id: string;
            species: string;
            price: string;
            category: string;
            title: string;
            name: string;
            birthday: string | null;
            comment: string;
            sex: string;
            location: string;
            imgURL: string;
            user: string;
            popularity: number;
        },
    ];
    phone: string;
    avatar: string;
    noticesViewed: Pet[];
    pets: UserPets[];
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

export type Pet = {
    _id: string;
    species: string;
    category: string;
    price: number;
    title: string;
    name: string;
    birthday: string | null;
    comment: string;
    sex: string;
    location: string;
    imgURL: string;
    user: string;
    popularity: number;
};

export type Location = {
    _id: string;
    useCounty: string;
    stateEn: string;
    cityEn: string;
    countyEn: string;
};

export type UserPets = Omit<
    Pet,
    'price' | 'location' | 'category' | 'comment' | 'user' | 'popularity'
>;
