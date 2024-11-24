import { TComment } from '../types/comment.types';
import { datatype, date } from 'faker';
import { makeFakeCommentUser } from './users';

export function makeFakeComment():TComment {
  return {
    comment: datatype.string(),
    date: String(date.soon()),
    id: datatype.uuid(),
    rating: datatype.number({ min:1, max: 5 }),
    user: makeFakeCommentUser()
  };
}
