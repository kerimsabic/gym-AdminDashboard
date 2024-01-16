import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import adminSlice from "./adminSlice";
import  { trainerApi,searchSlice } from "./trainersSlice";
import membersApi from "./memberSlice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        admins:adminSlice.reducer,
        trainerApi:trainerApi.reducer,
        membersApi:membersApi.reducer,
        search:searchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( membersApi.middleware,trainerApi.middleware, adminSlice.middleware,),
   
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectSearch = (state: RootState) => state.search.search;
export default store;