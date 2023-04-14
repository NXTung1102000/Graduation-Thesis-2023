import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import loadingSlice from "../component/LoadingAndNotice/loadingSlice";
// import noticeSlice from "../component/LoadingAndNotice/noticeSlice";
import counterReducer from '../page/counter/counterSlice.ts';
// import AuthSlice from "../pages/LogIn_Register/AuthSlice";
// import CartSlice from "../pages/user/cart/CartSlice";

const authPersistConfig = {
  key: 'auth',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const reducer = combineReducers({
  //   auth: persistReducer(authPersistConfig, AuthSlice),
  //   cart: persistReducer(cartPersistConfig, CartSlice),
  counter: counterReducer,
  //   isLoading: loadingSlice,
  //   notice: noticeSlice,
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
