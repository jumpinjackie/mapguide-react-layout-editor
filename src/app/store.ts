import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { EditorAction } from '../actions/editor-actions';
import { appDefReducer } from '../reducers/app-def';

export const store = configureStore<any, EditorAction>({
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
