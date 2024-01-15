import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminSlice from "./adminSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
       admins:adminSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminSlice.middleware),
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;