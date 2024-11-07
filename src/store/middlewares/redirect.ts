import {PayloadAction} from '@reduxjs/toolkit';
import { browserHistory } from '../../browser-history';
import {Middleware} from 'redux';


export const redirect: Middleware =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'app/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
