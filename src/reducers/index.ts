import { combineReducers } from '@reduxjs/toolkit';
import {global} from './global'
import {additional} from './additional'
import {profile} from './profile';
// ADD IMPORT

export const rootReducer = combineReducers({
  global,
  additional,
  profile,
  // ADD NEW REDUCER
});