import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { appDefReducer } from '../reducers/app-def';

export const store = configureStore({
  reducer: {
    appDef: appDefReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
