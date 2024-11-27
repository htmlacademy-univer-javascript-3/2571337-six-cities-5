import { TUser } from './user.types';

export type TComment = {
    id: string;
    date: string;
    user: Omit<TUser, 'email' | 'token'>;
    comment: string;
    rating: number;
}

export type AddCommentParams = {
    commentData: {
        comment: string;
        rating: number;
    };
    offerId: string;
}
