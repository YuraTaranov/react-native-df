import {createSlice} from '@reduxjs/toolkit';
import {IUser, TGlobalState} from '@types';

type TInitialState = TGlobalState['profile'];

type TSetProfile = {
  type: string;
  payload: IUser;
};

type TSetIsUserVerified = {
  type: string;
  payload: boolean;
};

const initialState: TInitialState = {
  user: null,
  isUserVerified: false,
};

const profileSlice = createSlice({
  name: '@@profile',
  initialState,
  reducers: {
    setProfile: (state, action: TSetProfile) => {
      state.user = action.payload;
    },
    setIsUserVerified: (state, action: TSetIsUserVerified) => {
      state.isUserVerified = action.payload;
    },
    resetProfile: () => initialState,
  },
});

// actions
export const {setProfile, setIsUserVerified, resetProfile} = profileSlice.actions;

// reducer
export const profile = profileSlice.reducer;

// selectors
export const selectProfile = (state: TGlobalState) => state.profile;
