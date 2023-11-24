import userSlice from "@/features/auth/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({  
  user: userSlice,
}));

export default configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

