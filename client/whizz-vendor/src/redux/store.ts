import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ordersReducer from "./orderSlice";
import menuReducer from './menuSlice';
import dashboardReducer from './dashboardSlice'; 
import vendorReducer from './vendorSlice';

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["vendor"],
};

const rootReducer = combineReducers({
  orders: ordersReducer,
  menu: menuReducer,
  dashboard: dashboardReducer,
  vendor: vendorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
