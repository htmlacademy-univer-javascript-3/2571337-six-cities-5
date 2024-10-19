import { TUser } from './user.types';

export type TComment = {
    id: string;
    date: string;
    user: TUser;
    comment: string;
    rating: 1 | 2 | 3 | 4 | 5;
}
