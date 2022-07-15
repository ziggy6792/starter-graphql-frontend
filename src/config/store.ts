import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import errorReducer, { ErrorState } from 'src/domain/error';

export interface IRootState {
  readonly error: ErrorState;
}

const reducer = combineReducers<IRootState>({
  error: errorReducer,
});

export let store: EnhancedStore<any>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const initStore = (initialState?: IRootState) => {
  store = configureStore({
    preloadedState: initialState,
    reducer,
  });
  return store;
};

export default initStore;
