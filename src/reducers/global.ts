import i18next from 'i18next';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TGlobalState} from '@types';

type TInitialState = TGlobalState['global'];

const initialState: TInitialState = {
  token: '',
  isAuthorized: false,
  firstOpenApp: true,
  language: '',
};

export const changeLanguage = createAsyncThunk('@@global/changeLanguage', async (payload: string, thunkAPI) => {
  thunkAPI.dispatch(setLanguage(payload));
  await i18next.changeLanguage(payload);
});

const globalSlice = createSlice({
  name: '@@global',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setFirstOpenApp: (state, action) => {
      state.firstOpenApp = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    resetGlobal: () => initialState,
  },
});

// actions
export const {setToken, setFirstOpenApp, setIsAuthorized, setLanguage, resetGlobal} = globalSlice.actions;

// reducer
export const global = globalSlice.reducer;

// selectors
export const selectGlobal = (state: TGlobalState) => state.global;
