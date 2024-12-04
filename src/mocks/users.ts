import { TUser } from '../types/user.types';
import { datatype, name, internet } from 'faker';
import { makeFakeCommentAvatar } from './images';
import { AuthStatus } from '../constants/user';

export function makeFakeCommentUser(): Omit<TUser, 'email' | 'token'> {
  return {
    avatarUrl: makeFakeCommentAvatar(),
    isPro: datatype.boolean(),
    name: `${name.firstName()} ${name.lastName()}`
  };
}

export function makeFakeUser(): TUser {
  return {
    avatarUrl: makeFakeCommentAvatar(),
    isPro: datatype.boolean(),
    name: `${name.firstName()} ${name.lastName()}`,
    email: internet.email(),
    token: datatype.string()
  };
}

export function makeFakeAuthStatus(): AuthStatus {
  const randomIndex = Math.floor(Math.random() * Object.values(AuthStatus).length);
  const randomAuthStatus = Object.values(AuthStatus)[randomIndex] ?? AuthStatus.Unknown;
  return randomAuthStatus;
}
