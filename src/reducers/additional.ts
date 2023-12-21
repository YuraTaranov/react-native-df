import {createSlice} from '@reduxjs/toolkit';
import {TGlobalState} from '@types';

type TInitialState = TGlobalState['additional'];

const initialState: TInitialState = {
  loading: false,
  authLoading: false,
  currentRouteName: '',
  biometricType: 'none',
};

const additionalSlice = createSlice({
  name: '@@additional',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setCurrentRouteName: (state, action) => {
      state.currentRouteName = action.payload;
    },
    setBiometricType: (state, action) => {
      state.biometricType = action.payload;
    },
    resetAdditional: () => initialState,
  },
});

// actions
export const {setLoading, setAuthLoading, setCurrentRouteName, setBiometricType, resetAdditional} =
  additionalSlice.actions;

// reducer
export const additional = additionalSlice.reducer;

// selectors
export const selectAdditional = (state: TGlobalState) => state.additional;
