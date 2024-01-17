import { BASE_URL, /*token*/ } from "@/utils/data";
import { Trainer } from "@/utils/types";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";  //ovje treabao dodati /react poslije query
import { useSelector } from "react-redux";
import { RootState } from ".";


/*const BEARER_TOKEN = `${token}`;*/



export const trainerApi=createApi({
    reducerPath:"trainerApi",
    baseQuery: (args, api, extraOptions) => {
      const { userToken } = api.getState().auth; // Assuming the auth slice has userToken
      const headers = {
        'authorization':`Bearer ${userToken}`
      };    
      return fetchBaseQuery({
        baseUrl: BASE_URL,
        headers,
      })(args, api, extraOptions);
    },
    tagTypes: ["trainerApi"],
    endpoints:(builder)=>({
        getTrainers : builder.query<Trainer[], undefined>({
            query:()=> "/trainers/",
            providesTags: ["trainerApi"],
        }),
        addTrainer: builder.mutation({
          query:(data)=>({
            url: '/auth/register',
            method:'POST',
            body: data
          }),
          invalidatesTags: ["trainerApi"],
        }),
        updateTrainer: builder.mutation({
          query: ({ id, data:{firstName, lastName, email, address, phone} }) => ({ 
              url: `/trainers/${id}`,
              method: "PUT",
              body: {firstName, lastName, email, address, phone}
          }),
          invalidatesTags: ["trainerApi"],
      }),
      deleteTrainer: builder.mutation({
        query: ({ id }) => ({ url: `/trainers/${id}`, method: "DELETE" }),
        invalidatesTags: ["trainerApi"],
    }),
    })
})

export const useTrainerQuery=trainerApi.endpoints.getTrainers.useQuery;
//export const {useGetTrainersQuery}=trainerApi ovo je druga opcija
export const {useAddTrainerMutation,useDeleteTrainerMutation,useUpdateTrainerMutation }= trainerApi;

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
export default trainerApi;


