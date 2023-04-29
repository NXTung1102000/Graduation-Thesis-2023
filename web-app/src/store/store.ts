import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loadingSlice from '../component/loading_notice/loadingSlide';
import noticeSlice from '../component/loading_notice/noticeSlice';
import AuthSlice from '../page/account/AuthSlice';

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

const reducer = combineReducers({
  // auth: persistReducer(authPersistConfig, AuthSlice),
  auth: AuthSlice,
  isLoading: loadingSlice,
  notice: noticeSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
