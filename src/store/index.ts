import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminSlice from "./adminSlice";
import  { trainerApi,searchSlice } from "./trainersSlice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        admins:adminSlice.reducer,
        trainerApi:trainerApi.reducer,
        search:searchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(trainerApi.middleware,adminSlice.middleware),
   
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectSearch = (state: RootState) => state.search.search;
export default store;