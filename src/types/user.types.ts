export type TUser = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
}

export type AuthCredentials = {
    password: string;
    email: string;
}
