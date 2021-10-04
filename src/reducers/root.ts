import { createStore, combineReducers } from 'redux';
import { appDefReducer } from "./app-def";

const rootReducer: any = {
    appDef: appDefReducer
};

export function configureStore(initialState: any) {
    const root = combineReducers(rootReducer);
    const store = createStore(root, initialState);
    return store;
}