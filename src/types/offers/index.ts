export enum PlaceType {
    APARTMENT = 'apartment',
    ROOM = 'room',
    HOUSE = 'house',
    HOTEL = 'hotel'
}

type Rate = 0 | 1 | 2 | 3 | 4 | 5;

export type CommonOffer = {
    id: string;
    title: string;
    type: PlaceType;
    price: number;
    city: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: Rate;
    previewImage: string;
}

export type Offer = {
    description: string;
    bedrooms: number;
    goods: string[];
    host: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    images: string[];
    maxAdults: number;
} & Omit<CommonOffer, 'previewImage'>;
