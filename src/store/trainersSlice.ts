import { BASE_URL } from "@/utils/data";
import { Trainer } from "@/utils/types";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";  //ovje treabao dodati /react poslije query
import { useQuery } from "react-query";

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDUzMTkzMzEsImV4cCI6MTcwNTM1NTMzMX0.CP742_LKQgCRZKGyUe7zRVLoQgtU6U009yRUGMghMpA';


export const trainerApi=createApi({
    reducerPath:"trainerApi",
    baseQuery:fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }),
    endpoints:(builder)=>({
        getTrainers : builder.query<Trainer[], undefined>({
            query:()=> "/trainers/",
        })
    })
})

export const useTrainerQuery=trainerApi.endpoints.getTrainers.useQuery;
//export const {useGetTrainersQuery}=trainerApi ovo je druga opcija

export const searchSlice = createSlice({
    name: "search",
    initialState: {
      search: "",
    },
    reducers: {
      setSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload;
      },
    },
  });
export const { setSearch } = searchSlice.actions;


/*export const selectTrainer = createSelector(
    (state: RootState) =>
      trainerApi.endpoints.getTrainers.select(undefined)(state)?.data,
    (state: RootState) => state.search.search,
    (trainer, search) =>
      (trainer || [])
        .filter((trainer) =>
            trainer.name.toLowerCase().includes(search.toLowerCase())
        )
       
  );*/



